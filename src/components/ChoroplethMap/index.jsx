import React, { memo, useState } from 'react';
import {
  ComposableMap,
  // ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps';
//import { scaleLinear } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

// const minColor = '#CFD8DC';
// const maxColor = '#37474F';

const ChoroplethMap = ({ data = {}, customScale }) => {
  const [tooltipContent, setTooltipContent] = useState('');

  // const values = Object.values(data);
  // const minValue = 0;
  // const maxValue = Math.max(...values);

  // const customScale = scaleLinear()
  //   .domain([minValue, maxValue])
  //   .range([minColor, maxColor]);

  return (
    <>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        //height={500}
        //width={700}
        style={{
          marginTop: '-40px',
          marginLeft: '-40px',
          //width: '100%',
          height: '140%',
          //marginRight: 'auto'
        }}
        data-tip=''
      //projectionConfig={{ scale: 150 }}
      >
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
        {/* </ZoomableGroup> */}
      </ComposableMap>
    </>
  );
};

export default memo(ChoroplethMap);
