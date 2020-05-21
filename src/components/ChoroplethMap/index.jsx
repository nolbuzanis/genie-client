import React, { memo } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
//import ReactTooltip from 'react-tooltip';

const data = {
  CA: 2
};

const minValue = 0; // based on the data array above
const maxValue = 2; // based on the data array above

const minColor = '#CFD8DC';
const maxColor = '#37474F';

const customScale = scaleLinear()
  .domain([minValue, maxValue])
  .range([minColor, maxColor]);

const ChoroplethMap = ({ setTooltipContent }) => {
  return (
    <ComposableMap
      width={980}
      height={551}
      style={{
        width: '100%',
        height: 'auto'
      }}
      data-tip=''
      //projectionConfig={{ scale: 200 }}
    >
      <ZoomableGroup>
        <Geographies geography='/world-50m-simplified.json'>
          {(geos, proj) =>
            geos.geographies.map((geo, i) => {
              const countryVal = data[geo.properties.ISO_A2];
              return (
                <Geography
                  key={geo.properties.ISO_A2 + i}
                  cacheId={geo.properties.ISO_A2 + i}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent(`${NAME} — ${countryVal || 0}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  projection={proj}
                  // onClick={() => {
                  //   console.log(geo.properties.NAME, countryVal);
                  //   // setTooltip(`${geo.properties.NAME}: ${countryVal || 0}`);
                  //   // ReactTooltip.show(ref.current);
                  // }}
                  style={{
                    default: {
                      fill: countryVal ? customScale(countryVal) : '#ECEFF1',
                      stroke: '#FFF',
                      strokeWidth: 0.75,
                      outline: 'none'
                    },
                    hover: {
                      fill: '#263238',
                      stroke: '#FFF',
                      strokeWidth: 0.75,
                      outline: 'none'
                    },
                    pressed: {
                      fill: '#263238',
                      stroke: '#FFF',
                      strokeWidth: 0.75,
                      outline: 'none'
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default memo(ChoroplethMap);
