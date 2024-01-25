import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Book()
{
  const position = [51.505, -0.09];
return(
<section class="book_section layout_padding">
<div class="container">
  <div class="heading_container">
    <h2>
      Book A Table
    </h2>
  </div>
  <div class="row">
    <div class="col-md-6">
      <div class="form_container">
        <form action="">
          <div>
            <input type="text" class="form-control" placeholder="Your Name" />
          </div>
          <div>
            <input type="text" class="form-control" placeholder="Phone Number" />
          </div>
          <div>
            <input type="email" class="form-control" placeholder="Your Email" />
          </div>
          <div>
            <select class="form-control nice-select wide">
              <option value="" disabled selected>
                How many persons?
              </option>
              <option value="">
                2
              </option>
              <option value="">
                3
              </option>
              <option value="">
                4
              </option>
              <option value="">
                5
              </option>
            </select>
          </div>
          <div>
            <input type="date" class="form-control" />
          </div>
          <div class="btn_box">
            <button>
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="col-md-6">
      <div class="map_container ">
        <div id="googleMap">
        <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
)
}