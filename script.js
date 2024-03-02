document.addEventListener('DOMContentLoaded', function() {
    // Event listener para campos de entrada y para inicializar la calculadora
    document.getElementById('ingresoMensual').addEventListener('input', actualizarCalculos);
    document.getElementById('porcentajeAhorro').addEventListener('input', actualizarCalculos);
    document.getElementById('mesesAhorro').addEventListener('input', actualizarCalculos);
    document.querySelectorAll('input[name="ahorroTipo"]').forEach(radio => {
        radio.addEventListener('change', actualizarTipoAhorro);
    });
    // Establecer el estado inicial correcto y calcular los presupuestos iniciales
    actualizarTipoAhorro();

    // Event listener para opciones de ahorro
    const opcionesAhorro = document.querySelectorAll('.OpcionesAhorro input[type="radio"]');
    opcionesAhorro.forEach(function(radio) {
        radio.addEventListener('change', function() {
            // Remover la clase de todas las opciones de ahorro para restablecer el estado visual
            opcionesAhorro.forEach(function(radio) {
                radio.closest('.OpcionesAhorro').classList.remove('OpcionesAhorroSeleccionado');
            });

            // Agregar la clase solo a la opción seleccionada
            if (radio.checked) {
                radio.closest('.OpcionesAhorro').classList.add('OpcionesAhorroSeleccionado');
            }

            // Recalcular presupuestos
            calcularPresupuesto();
        });
    });
});

// Función para actualizar el tipo de ahorro
function actualizarTipoAhorro() {
    var tipoAhorro = document.querySelector('input[name="ahorroTipo"]:checked').value;
    var inputMesesAhorro = document.getElementById('mesesAhorroInput');
    inputMesesAhorro.style.display = tipoAhorro === 'custom' ? 'block' : 'none';
    calcularPresupuesto(); // Recalcular presupuestos cuando cambia el tipo de ahorro
}

// Función para calcular y mostrar los presupuestos
function actualizarCalculos() {
    calcularPresupuesto(); // Recalcular presupuestos cuando cambian los valores de entrada
}

// Función para calcular y mostrar los presupuestos
function calcularPresupuesto() {
    var ingresoMensual = parseFloat(document.getElementById('ingresoMensual').value) || 0;
    var porcentajeAhorro = parseFloat(document.getElementById('porcentajeAhorro').value) || 10;
    var tipoAhorro = document.querySelector('input[name="ahorroTipo"]:checked').value;
    var mesesAhorro = tipoAhorro === 'custom' ? parseFloat(document.getElementById('mesesAhorro').value) || 0 : 0;

    var resultadosHTML = '';
    var planesViaje = obtenerPlanesViaje(tipoAhorro, mesesAhorro);
    for (var plan in planesViaje) {
        var duracion = planesViaje[plan];
        var totalAhorrado = calcularTotalAhorrado(ingresoMensual, porcentajeAhorro, duracion);
        var { montoAlojamiento, montoTransporte, montoOcio } = calcularMontos(totalAhorrado);
        
        resultadosHTML += `
        <div class="result-card">
            <div class="result-header">
                <label>${plan}</label>
                <label>Total Ahorro: $${totalAhorrado.toFixed(2)}</label>
            </div>
            <div class="result-detail">
                <span>Meses de ahorro: ${duracion}</span>
            </div>
            <div class="gasto-item">
                <div class="gasto-info">
                    <span class="icon-wrapper"><i class="fa-solid fa-house"></i></span>
                    <span>Alojamiento</span>
                </div>
                <div class="monto-info">
                    <span class="monto">$${montoAlojamiento.toFixed(2)}</span>
                    <span class="porcentaje">40%</span>
                </div>
            </div>
            <div class="gasto-item">
                <div class="gasto-info">
                    <span class="icon-wrapper"><i class="fa-solid fa-bus"></i></span>
                    <span>Transporte</span>
                </div>
                <div class="monto-info">
                    <span class="monto">$${montoTransporte.toFixed(2)}</span>
                    <span class="porcentaje">40%</span>
                </div>
            </div>
            <div class="gasto-item">
                <div class="gasto-info">
                    <span class="icon-wrapper"><i class="fa-solid fa-face-smile"></i></span>
                    <span>Ocio</span>
                </div>
                <div class="monto-info">
                    <span class="monto">$${montoOcio.toFixed(2)}</span>
                    <span class="porcentaje">20%</span>
                </div>
            </div>
        </div>`;
    }

    document.getElementById('resultados').innerHTML = resultadosHTML;
}

// Función para obtener los planes de viaje según el tipo de ahorro seleccionado
function obtenerPlanesViaje(tipoAhorro, mesesAhorro) {
    return tipoAhorro === 'custom' ? {"Meses Personalizados": mesesAhorro} :
        {"Escapada": 1, "Viaje Simple": 2, "Viaje Regular": 3, "Viaje Largo": 4, "Vacaciones": 5};
}

// Función para calcular el total ahorrado
function calcularTotalAhorrado(ingresoMensual, porcentajeAhorro, duracion) {
    var ahorroMensual = ingresoMensual * (porcentajeAhorro / 100);
    return ahorroMensual * duracion;
}

// Función para calcular los montos de alojamiento, transporte y ocio
function calcularMontos(totalAhorrado) {
    var montoAlojamiento = totalAhorrado * 0.40;
    var montoTransporte = totalAhorrado * 0.40;
    var montoOcio = totalAhorrado * 0.20;
    return {montoAlojamiento, montoTransporte, montoOcio};
}
