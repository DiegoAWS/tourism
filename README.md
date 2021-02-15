<h1>Prueba FULL STACK</h1>
<h2>BURÓ DE VENTAS</h2>
<hr/>
<h2>Pasos para Instalar</h2>

<ul>
<li> dotnet ef database update</li>
<li> <code> cd ClientApp && yarn</code> </li>
<li> <code> yarn start</code> </li>
<li> <code> cd ..</code> </li>
<li> <code> dotnet run</code> </li>
</ul>
<hr/>
<p>
Se necesita implementar una aplicación web para la gestión de paquetes turísticos y su posterior venta a clientes.
Para el caso de los paquetes se deben registrar las ofertas que lo componen (Hospedajes, Traslados, Excursiones) así como el costo total.
Para los hospedajes necesitamos la ubicación, datos de contactos, fecha de inicio, cantidad de noches y precio.
Para los traslados se quiere almacenar el tipo de auto (Auto, Taxi, Bus, Mini), hora de salida, duración del viaje, punto de inicio, paradas, final del recorrido y precio.
Para las excursiones necesitaríamos la fecha de inicio, destino, información del destino, ofertas incluidas en la excursión, hora de salida y hora de regreso, así como el precio.
El objetivo es que un operador de un buró de ventas pueda armar paquetes turísticos personalizados a sus clientes y que pueda ofertarlos, para lo cual se necesita además registrar de la venta, la fecha de la venta, fecha de inicio, vendedor, agencia, nombre del cliente, nacionalidad, número de identidad (Pasaporte o Carné), Paquete comprado, cupón de descuento (si aplica), sub total de la compra sin el descuento y el total final una vez restado el descuento.
Se piensa distribuir a otras agencias del sector por lo que necesitamos un API, bien documentada la cual podamos en un futuro permitir sea consumida por otras agencias.
La aplicación de cara al cliente debe ser un SPA, fácil de usar en la que los operadores puedan ver solo sus registros de venta y sus paquetes, pero los mismos serán visibles para el jefe del grupo de ventas sin importar quien lo generó.
Las excursiones, traslados y hospedajes son publicas para todos los agentes.
</p>
