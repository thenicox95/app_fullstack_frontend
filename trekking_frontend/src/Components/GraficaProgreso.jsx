import "./ComponentsCss/GraficaProgreso.css"
import { Doughnut } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const GraficaProgreso = ({ porcentaje }) => {

    const data = {
        //Esta es la informacion que recibe la dona para su creacion en el html.
        labels: ["Rutas creadas", "Rutas disponibles"],
        datasets: [
            {
                //El porcentaje que le pasamos por props para que le reste al 100%
                data: [porcentaje, 100 - porcentaje],
                backgroundColor: ["#2696CF", "#E5E7EB"],
                borderWidth: 0
            }
        ]
    };

    const options = {
        cutout: "75%",
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div className="grafica-progreso">
            <h3>Progreso de rutas</h3>
            <Doughnut data={data} options={options} />
            <p>{porcentaje}% completado</p>
        </div>
    );
};

export default GraficaProgreso;