import "./ComponentsCss/GraficaRutasPorCategoria.css";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

import { useSelector } from "react-redux";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const GraficaRutasPorCategoria = ({ rutas }) => {

    // Obtenemos las categorías desde Redux.
    const categorias = useSelector(
        (state) => state.categorias.categorias
    );

    // Calculamos cuántas rutas tiene cada categoría.
    const cantidades = categorias.map((categoria) => {
        return rutas.filter(
            (ruta) => ruta.categoria === categoria._id
        ).length;
    });

    // Calculamos el total de rutas del usuario.
    const totalRutas = rutas.length;

    // Calculamos el porcentaje de cada categoría.
    const porcentajes = cantidades.map((cantidad) => {
        return totalRutas === 0
            ? 0
            : Number(((cantidad / totalRutas) * 100).toFixed(1));
    });

    const data = {
        labels: categorias.map((categoria) => categoria.nombre),

        datasets: [
            {
                label: "Porcentaje de rutas",
                data: porcentajes,
                backgroundColor: "#2696CF",
                borderRadius: 6
            }
        ]
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const indice = context.dataIndex;
                        return `${porcentajes[indice]}% (${cantidades[indice]} rutas)`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: (value) => `${value}%`
                }
            }
        }
    };

    // return (
    //     <div className="grafica-progreso">
    //         <h3>Rutas por categoría</h3>

    //         {totalRutas === 0 ? (
    //             <p>Todavía no has creado rutas.</p>
    //         ) : (
    //             <Bar data={data} options={options} />
    //         )}
    //     </div>
    // );

    return (
    <div className="grafica-categorias-container">

        <h3>Rutas por categoría</h3>

        {totalRutas === 0 ? (
            <p>Todavía no has creado rutas.</p>
        ) : (
            <div className="grafica-categorias-chart">
                <Bar data={data} options={options} />
            </div>
        )}

    </div>
);
};

export default GraficaRutasPorCategoria;
