function cambiarTipoAhorro() {
    var tipoAhorro = document.querySelector('input[name="ahorroTipo"]:checked').value;
    var inputMesesAhorro = document.getElementById('mesesAhorroInput');
    
    if (tipoAhorro === 'custom') {
        inputMesesAhorro.style.display = 'block'; // Mostrar campo de meses personalizado
    } else {
        inputMesesAhorro.style.display = 'none'; // Ocultar campo de meses personalizado
        calcularPresupuesto(); // Recalcular presupuestos para opciones predefinidas
    }
}

function calcularPresupuesto() {
    var ingresoMensual = parseFloat(document.getElementById('ingresoMensual').value) || 0;
    var porcentajeAhorro = parseFloat(document.getElementById('porcentajeAhorro').value) || 10;
    var tipoAhorro = document.querySelector('input[name="ahorroTipo"]:checked').value;
    
    var planesViaje;
    if (tipoAhorro === 'custom') {
        var mesesAhorroCustom = parseFloat(document.getElementById('mesesAhorro').value) || 0;
        planesViaje = {"Meses Personalizados": mesesAhorroCustom};
    } else {
        planesViaje = {
            "Escapada": 1,
            "Viaje Simple": 2,
            "Viaje Regular": 3,
            "Viaje Largo": 4,
            "Vacaciones": 5
        };
    }

    var resultadosHTML = '';
    for (var plan in planesViaje) {
        var duracion = planesViaje[plan];
        var ahorroMensual = ingresoMensual * (porcentajeAhorro / 100);
        var totalAhorrado = ahorroMensual * duracion;
        var montoAlojamiento = totalAhorrado * 0.40;
        var montoTransporte = totalAhorrado * 0.40;
        var montoOcio = totalAhorrado * 0.20;
        
        resultadosHTML += `
            <div class="result-card">
                <h3>${plan} (${duracion} meses de ahorro) | Total Ahorrado: $${totalAhorrado.toFixed(2)}</h3>
                <ul>
                    <li>Alojamiento (40%): $${montoAlojamiento.toFixed(2)}</li>
                    <li>Transporte (40%): $${montoTransporte.toFixed(2)}</li>
                    <li>Ocio (20%): $${montoOcio.toFixed(2)}</li>
                </ul>
            </div>
        `;
    }

    document.getElementById('resultados').innerHTML = resultadosHTML;
}

// Event listener para los campos de entrada y para inicializar la calculadora
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('ingresoMensual').addEventListener('input', calcularPresupuesto);
    document.getElementById('porcentajeAhorro').addEventListener('input', calcularPresupuesto);
    document.getElementById('mesesAhorro').addEventListener('input', calcularPresupuesto);
    document.querySelectorAll('input[name="ahorroTipo"]').forEach(radio => {
        radio.addEventListener('change', cambiarTipoAhorro);
    });
    cambiarTipoAhorro(); // Para establecer el estado inicial correcto y calcular los presupuestos iniciales
});

////////


document.addEventListener('DOMContentLoaded', function() {
  const opcionesAhorro = document.querySelectorAll('.OpcionesAhorro input[type="radio"]');

  opcionesAhorro.forEach(function(radio) {
    radio.addEventListener('change', function() {
      // Primero, quita la clase de todos los divs para resetear el estado visual
      opcionesAhorro.forEach(function(radio) {
        radio.closest('.OpcionesAhorro').classList.remove('OpcionesAhorroSeleccionado');
      });

      // Luego, añade la clase al div padre del radio seleccionado
      if (radio.checked) {
        radio.closest('.OpcionesAhorro').classList.add('OpcionesAhorroSeleccionado');
      }
    });
  });
});
