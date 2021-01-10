import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
// import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export default function ContactMap({ positions }) {

  const foto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  return (
    <YMaps
      query={{
        ns: 'use-load-option',
        load:
          'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
      }}>
      <Map width="100%" height="600px"
        defaultState={{
          center: [55.75, 37.57],
          zoom: 3,
          controls: ['zoomControl', 'fullscreenControl'],
        }}>
        <div>
          {positions.map((element) => {
            return < Placemark
              defaultGeometry={[element.lat, element.lon]}
              properties={{
                balloonContentBody: element.img ? `<img src="/userPic/${element.img}" height="150"> <br /> ` +
                  // `<b>${element.firstname} ${element.surname}</b><br>` :
                  `<b><a style="color:black;  text-decoration: underline; font-size: 15px" target="_blank" href="${process.env.REACT_APP_URL}/student/${element.userId}">${element.firstname} ${element.surname} 🔗</a></b><br>` :
                  `<img src="${foto}" height="150"> <br /> ` +
                  `<b><a style="color:black;  text-decoration: underline; font-size: 15px" target="_blank" href="${process.env.REACT_APP_URL}/student/${element.userId}">${element.firstname} ${element.surname} 🔗</a></b><br>`
              }} />


          })
          }
        </div>

      </Map>


    </YMaps>



  );

}
