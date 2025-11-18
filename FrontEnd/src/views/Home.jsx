// src/views/Home.jsx
import React, { useEffect, useState, useContext, useMemo } from "react";
import ProductsContainer from "../components/ProductsContainer";
import Card from "../components/Card";
import ListSimple from "../components/ListSimple";
import Form from "../components/Form";
import { AuthContext } from "../utils/AuthContext";

/**
 * Home.jsx - Versión completa y desarrollada
 * Funcionalidades:
 *  - cargar productos + marcas (API_BASE)
 *  - búsqueda, filtrado por marca/tipo, orden y paginado (cliente)
 *  - crear y eliminar marcas (con token si corresponde)
 *  - estados: loading, error, empty
 *  - responsive, lazy-loading de imágenes
 */

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

const PAGE_SIZE_DEFAULT = 8;

export default function Home() {
  const { token } = useContext(AuthContext);

  // datos principales
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);

  // UI / control
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState(""); // texto libre
  const [marcaFilter, setMarcaFilter] = useState(""); // id o nombre de marca
  // tipoFilter eliminado completamente
  const [sortKey, setSortKey] = useState("nombre"); // 'nombre' | 'precio' | 'tipo'
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // helper: headers con auth si corresponde
  const authHeaders = React.useCallback(() => (token ? { Authorization: `Bearer ${token}` } : {}), [token]);

  // fetch wrapper con manejo básico de errores
  // async function fetchJSON(url, opts = {}) {
  //   const res = await fetch(url, opts);
  //   if (!res.ok) {
  //     const body = await res.json().catch(() => ({}));
  //     const msg = body.msg || body.error || res.statusText;
  //     const err = new Error(msg);
  //     err.status = res.status;
  //     throw err;
  //   }
  //   return res.json();
  // } // Eliminado porque no se usa

  // cargar productos y marcas (paralelo)
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function loadAll() {
      setLoading(true);
      setError(null);
      try {
        const [rProductos, rMarcas] = await Promise.all([
          fetch(`${API_BASE}/productos`, { headers: { "Content-Type": "application/json", ...authHeaders(), }, signal }),
          fetch(`${API_BASE}/marcas`, { headers: { "Content-Type": "application/json", ...authHeaders(), }, signal }),
        ]);

        if (!rProductos.ok || !rMarcas.ok) {
          // detectamos cuál falló para dar mejor mensaje
          if (!rProductos.ok) {
            const b = await rProductos.json().catch(()=>({}));
            throw new Error(b.msg || `Error productos: ${rProductos.status}`);
          }
          if (!rMarcas.ok) {
            const b = await rMarcas.json().catch(()=>({}));
            throw new Error(b.msg || `Error marcas: ${rMarcas.status}`);
          }
        }

        const jp = await rProductos.json();
        const jm = await rMarcas.json();

        // backend puede devolver array directamente o {data: [...]}
        const productosData = Array.isArray(jp) ? jp : (jp.data || jp.products || []);
        const marcasData = Array.isArray(jm) ? jm : (jm.data || []);

        setProductos(productosData);
        setMarcas(marcasData);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Error cargando Home data:", err);
        setError(err.message || "Error al cargar datos");
      } finally {
        setLoading(false);
      }
    }

    loadAll();
    return () => controller.abort();
  }, [token, authHeaders]);

  // Crear marca
  async function createMarca(body) {
    try {
      // validación mínima
      if (!body.nombre || body.nombre.trim().length < 2) {
        alert("Nombre de marca inválido");
        return;
      }
      const res = await fetch(`${API_BASE}/marcas`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const b = await res.json().catch(()=>({}));
        throw new Error(b.msg || b.error || res.statusText);
      }
      const d = await res.json();
      const nueva = d.data || d || body;
      // si returned is array, lo manejamos; si es single obj, lo añadimos
      setMarcas((m) => (Array.isArray(nueva) ? [...nueva, ...m] : [nueva, ...m]));
      alert("Marca creada correctamente");
    } catch (err) {
      console.error("createMarca", err);
      alert(err.message || "Error creando marca");
    }
  }

  // Eliminar marca
  async function deleteMarca(id) {
    if (!confirm("¿Eliminar marca? Esta acción es irreversible.")) return;
    try {
      const res = await fetch(`${API_BASE}/marcas/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...authHeaders() },
      });
      if (!res.ok) {
        const b = await res.json().catch(()=>({}));
        throw new Error(b.msg || b.error || res.statusText);
      }
      setMarcas((m) => m.filter((x) => (x._id || x.id) !== id));
      alert("Marca eliminada");
    } catch (err) {
      console.error("deleteMarca", err);
      alert(err.message || "Error eliminando marca");
    }
  }

  // filtros y ordenamiento (client-side)
  const productosProcesados = useMemo(() => {
    let list = Array.isArray(productos) ? [...productos] : [];

    // filtro por texto
    const q = String(filter || "").trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const nombre = (p.nombre || p.title || "").toString().toLowerCase();
        const tipo = (p.tipo || "").toString().toLowerCase();
        const marcaNombre = (p.marca && p.marca.nombre) ? p.marca.nombre.toLowerCase() : "";
        return nombre.includes(q) || tipo.includes(q) || marcaNombre.includes(q);
      });
    }

    // por marca (por ObjectId)
    if (marcaFilter) {
      list = list.filter(p => p.marca && (p.marca._id === marcaFilter));
    }

    // filtro por tipo eliminado (tipoFilter ya no existe)

    // orden
    list.sort((a, b) => {
      if (sortKey === "nombre") return String(a.nombre || "").localeCompare(String(b.nombre || ""));
      if (sortKey === "tipo") return String(a.tipo || "").localeCompare(String(b.tipo || ""));
      if (sortKey === "precio") return (a.precio || 0) - (b.precio || 0);
      return 0;
    });

    return list;
  }, [productos, filter, marcaFilter, sortKey]);

  // paginado (cliente)
  const totalItems = productosProcesados.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  // ensure page within bounds
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const startIndex = (page - 1) * pageSize;
  const pagedProductos = productosProcesados.slice(startIndex, startIndex + pageSize);

  // helpers UI
  const handlePageChange = (next) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
    // scroll to top of content on page change (mejora UX)
    const contentEl = document.querySelector(".home-content");
    if (contentEl) contentEl.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="home-root">
      <header className="card header-card" role="banner">
        <div>
          <h2>Kälm — El cambio comienza en tu rutina.</h2>
          <p className="muted">Productos y marcas pensadas para tu rutina diaria.</p>
        </div>

        <div className="header-controls" role="search" aria-label="Buscar productos">
          <input
            className="search-input"
            placeholder="Buscar por producto, tipo o marca..."
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
            aria-label="Buscar productos"
          />

          <select
            aria-label="Filtrar por marca"
            value={marcaFilter}
            onChange={(e) => { setMarcaFilter(e.target.value); setPage(1); }}
            className="select-filter"
          >
            <option value="">Todas las marcas</option>
            {marcas.map((m) => (
              <option key={m._id || m.id || m.nombre} value={m._id || m.nombre}>
                {m.nombre}
              </option>
            ))}
          </select>

          <select
            aria-label="Ordenar por"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="select-filter"
          >
            <option value="nombre">Orden: Nombre</option>
            <option value="tipo">Orden: Tipo</option>
            <option value="precio">Orden: Precio</option>
          </select>

          <button
            className="btn ghost small mobile-toggle"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-expanded={sidebarOpen}
            aria-controls="home-aside"
            style={{ marginTop: 8 }}
          >
            {sidebarOpen ? "Ocultar opciones" : "Opciones"}
          </button>
        </div>
      </header>

      {error && <div className="card error">Error: {error}</div>}

      <main className="home-layout">
        {/* SIDEBAR: colapsable en móvil */}
        <aside
          id="home-aside"
          className={`home-sidebar${sidebarOpen ? " open" : ""}`}
          aria-hidden={!sidebarOpen}
          style={{ display: sidebarOpen ? undefined : "none" }}
        >
          <div className="card">
            <h4>Crear marca</h4>
            <Form
              fields={[
                { name: "nombre", label: "Nombre", default: "" },
                { name: "origen", label: "Origen / nota", default: "" },
              ]}
              submitLabel="Crear marca"
              onSubmit={createMarca}
            />
          </div>



          <div className="card">
            <h4>Marcas</h4>
            <ListSimple
              title=""
              items={marcas}
              onDelete={deleteMarca}
              renderItem={(m) => (
                <div>
                  <strong>{m.nombre}</strong>
                  <div className="muted">{m.origen}</div>
                </div>
              )}
            />
          </div>

          <div className="card aside-card">
            <h4>Consejo Kälm</h4>
            <p className="mini">Respiración 4-6: 4s inhala — 6s exhala. Repetir 5 veces.</p>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <section className="home-content" aria-live="polite">
          {loading ? (
            <div className="card">
              <div className="skeleton-grid">
                {Array.from({ length: Math.min(8, pageSize) }).map((_, i) => (
                  <div key={i} className="skeleton-card" />
                ))}
              </div>
            </div>
          ) : (
            <>
              <ProductsContainer title={`Productos recomendados (${totalItems})`}>
                {pagedProductos.length === 0 ? (
                  <div className="card">
                    <p className="muted">No hay productos que coincidan. Prueba otro filtro o búsqueda.</p>
                  </div>
                ) : (
                  pagedProductos.map((p) => (
                    <Card
                      key={p._id || p.id}
                      id={p._id || p.id}
                      title={p.nombre || p.title}
                      subtitle={p.tipo}
                      image={p.foto}
                      meta={p.marca}
                    />
                  ))
                )}
              </ProductsContainer>

              {/* paginador simple */}
              <div className="card" aria-label="Paginación">
                <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                  <div className="mini muted">Página {page} de {totalPages}</div>
                  <div className="row">
                    <button className="btn ghost" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>Anterior</button>
                    <button className="btn" onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>Siguiente</button>
                    <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="select-filter">
                      <option value={4}>4</option>
                      <option value={8}>8</option>
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
