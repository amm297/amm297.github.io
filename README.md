# Exploración y visualización moderna D3.js

El resultado final de la práctica lo podremos ver [aqui](https://amm297.github.io/).

El primer paso ha sido realizar un dataset inicial de los barrios de Madrid conel precio medio, el precio medio se calculo con un script sencillo que agrupase los alojamieno por barrio y de ahi sumase los campos `price, security_deposit y cleaning_fee` de cada alojamiento y los dividiese por el total de los mismos para cada zona, con los resultados se actualizo en dataset a mano. 

El dataset se desarrollo en [cato](https://carto.com/) y podemos encontrarlo [aqui](https://amm297.carto.com/dataset/airbnb_madrid)

La práctica consta de dos 'ventanas' a la izquierda poremos observar el mapa y a la derecha el grafico de barras, segun se pinche en un barrio del mapa se actualizará la vista de la derecha. La gráfica mostrará la relacion de la cantidad de alojamientos con el número de camas segun que barrio. Al mismo tiempo el encabezado mostrará el nombre del barrio seleccionado.
