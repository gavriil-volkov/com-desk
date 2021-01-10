import { YMaps, Map, Placemark } from 'react-yandex-maps';
import React from 'react'
import { usePosition } from 'use-position';



function Emap() {

	const watch = true;
  const {
    latitude,
    longitude
  } = usePosition(watch);

	return (
		<YMaps
		query={{
			ns: 'use-load-option',
			load:
				'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
		}}
	>
		<Map
			defaultState={{
				center: [55.75, 37.57],
				zoom: 9,
				controls: ['zoomControl', 'fullscreenControl'],
			}}
		>
			<Placemark
				defaultGeometry={[latitude, longitude]}
				properties={{
					balloonContentBody:
						'This is balloon loaded by the Yandex.Maps API module system',
				}}
			/>
		</Map> 
		<div>
		latitude: {latitude}<br/>
      longitude: {longitude}<br/>
			</div>
	</YMaps>
	)
}

export default Emap
