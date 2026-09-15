# Landing page Home Wonder Safe

## Objetivo
Crear una página única, móvil primero, enfocada en captar prospectos para Home Wonder Safe sin mostrar precios.

## Implementación
- Aplicar la identidad J&M: fondos azul oscuro, acentos dorados, títulos serif y textos sans-serif.
- Construir el encabezado fijo, portada con video de YouTube y respaldo visual, llamadas a la acción y navegación por scroll.
- Crear las secciones editoriales solicitadas: propuesta de valor, ubicación, tipologías, interiores, equipamiento y respaldo técnico.
- Integrar todas las imágenes disponibles; las imágenes mencionadas pero no adjuntadas se omitirán sin usar reemplazos genéricos.
- Crear el formulario con validación en tiempo real, estados de envío y confirmación; dejar la URL de Apps Script en una constante editable.
- Añadir contacto directo, botón flotante de WhatsApp, pie de página, animaciones sutiles y accesibilidad básica.
- Preparar favicon y metadatos específicos del proyecto.

## Detalles técnicos
- Los recursos subidos se servirán optimizados desde los recursos del proyecto.
- La petición a Google Sheets usará JSON y `mode: no-cors`; mientras la URL siga siendo el marcador, se mostrará un error claro en vez de enviar datos a un destino inválido.
- Se comprobará el resultado en tamaños móvil y escritorio, además de los estados del formulario.
