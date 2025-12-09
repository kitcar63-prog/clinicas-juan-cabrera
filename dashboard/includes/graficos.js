/**
 * Dashboard CRM
 */


  let cardColor, headingColor, labelColor, legendColor, shadeColor, borderColor, heatMap1, heatMap2, heatMap3, heatMap4;

  if (isDarkStyle) {
    cardColor = config.colors_dark.cardColor;
    headingColor = config.colors_dark.headingColor;
    labelColor = config.colors_dark.textMuted;
    legendColor = config.colors_dark.bodyColor;
    borderColor = config.colors_dark.borderColor;
    shadeColor = 'dark';
    heatMap1 = '#4f51c0';
    heatMap2 = '#595cd9';
    heatMap3 = '#8789ff';
    heatMap4 = '#c3c4ff';
  } else {
    cardColor = config.colors.white;
    headingColor = config.colors.headingColor;
    labelColor = config.colors.textMuted;
    legendColor = config.colors.bodyColor;
    borderColor = config.colors.borderColor;
    shadeColor = '';
    heatMap1 = '#e1e2ff';
    heatMap2 = '#c3c4ff';
    heatMap3 = '#a5a7ff';
    heatMap4 = '#696cff';
  }

  // Donut Chart Colors
  const chartColors = {
    donut: {
      series1: config.colors.success,
      series2: 'rgba(113, 221, 55, 0.6)',
      series3: 'rgba(113, 221, 55, 0.4)',
      series4: 'rgba(113, 221, 55, 0.2)'
    }
  };

  
  
    // A.1 Grafico pizza cantidad de emails por clínicas
  // --------------------------------------------------------------------
  const emailsPizzaClinica = document.querySelector('#emailsPizzaClinica'),
  emailsPizzaClinicaConfig = {
      chart: {
        height: 165,
        width: 130,
        type: 'donut'
      },
        labels: ['Madrid', 'Barcelona', 'Granada', 'Coruña'],
      series: [40, 30, 15, 15],
      colors: [config.colors.primary, config.colors.secondary, config.colors.info, config.colors.success],
      stroke: {
        width: 5,
        colors: [cardColor]
      },
      dataLabels: {
        enabled: false,
        formatter: function (val, opt) {
          return parseInt(val) + '%';
        }
      },
      legend: {
        show: false
      },
      grid: {
        padding: {
          top: 0,
          bottom: 0,
          right: 15
        }
      },
      states: {
        hover: {
          filter: { type: 'none' }
        },
        active: {
          filter: { type: 'none' }
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              value: {
                fontSize: '1.5rem',
                fontFamily: 'Public Sans',
                color: headingColor,
                offsetY: -15,
                formatter: function (val) {
                  return parseInt(val) + '%';
                }
              },
              name: {
                offsetY: 20,
                fontFamily: 'Public Sans'
              },
              total: {
                show: true,
                fontSize: '0.8125rem',
                color: legendColor,
                label: 'Madrid',
                formatter: function (w) {
                  return '40%';
                }
              }
            }
          }
        }
      }
    };
 

  // A.2 Grafico linea comparativa tiempo actual con anterior
  // --------------------------------------------------------------------
  // Shipment statistics Chart
  // --------------------------------------------------------------------
  const emailsLineaBarraComparativa = document.querySelector('#emailsLineaBarraComparativa'),
    emailsLineaBarraComparativaConfig = {
      series: [
        {
          name: 'Ahora',
          type: 'column',
          data: [38, 45, 33, 38, 32, 50, 48, 40, 42, 37]
        },
        {
          name: 'Antes',
          type: 'line',
          data: [23, 28, 23, 32, 28, 44, 32, 38, 26, 34]
        }
      ],
      chart: {
        height: 270,
        type: 'line',
        stacked: false,
        parentHeightOffset: 0,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      markers: {
        size: 0,
        colors: [config.colors.white],
        strokeColors: ['#FF0000'],
        hover: {
          size: 6
        },
        borderRadius: 4
      },
      stroke: {
        curve: 'smooth',
        width: [0, 3],
        lineCap: 'round'
      },
      legend: {
        show: true,
        position: 'bottom',
        markers: {
          width: 8,
          height: 8,
          offsetX: -3
        },
        height: 40,
        offsetY: 10,
        itemMargin: {
          horizontal: 10,
          vertical: 0
        },
        fontSize: '15px',
        fontFamily: 'Public Sans',
        fontWeight: 400,
        labels: {
          colors: headingColor,
          useSeriesColors: false
        },
        offsetY: 10
      },
      grid: {
        strokeDashArray: 8
      },
      colors: ['#03C3EC','#C38DF7','#f59330','#85a29e'],
      fill: {
        opacity: [1, 1]
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
          startingShape: 'rounded',
          endingShape: 'rounded',
          borderRadius: 4
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        tickAmount: 10,
        categories: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan', '9 Jan', '10 Jan'],
        labels: {
          style: {
            colors: labelColor,
            fontSize: '13px',
            fontFamily: 'Public Sans',
            fontWeight: 400
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        tickAmount: 7,
        min: 0,
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
            fontFamily: 'Public Sans',
            fontWeight: 400
          },
          formatter: function (val) {
            return Math.round(val);
          }
        }
      },
      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 270
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: '10px'
                }
              }
            },
            legend: {
              itemMargin: {
                vertical: 0,
                horizontal: 10
              },
              fontSize: '13px',
              offsetY: 12
            }
          }
        },
        {
          breakpoint: 1399,
          options: {
            chart: {
              height: 415
            },
            plotOptions: {
              bar: {
                columnWidth: '50%'
              }
            }
          }
        },
        {
          breakpoint: 982,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '30%'
              }
            }
          }
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 250
            },
            legend: {
              offsetY: 7
            }
          }
        }
      ]
    };

      // B.1 Grafico pizza cantidad de emails por clínicas
  // --------------------------------------------------------------------
  const emailsPizzaTipos = document.querySelector('#emailsPizzaTipos'),
    emailsPizzaTiposConfig = {
      chart: {
        height: 165,
        width: 130,
        type: 'pie'
      },
      labels: ['Madrid', 'Barcelona', 'Granada', 'Coruña'],
      series: [40, 30, 15, 15],
      colors: [config.colors.primary, config.colors.secondary, config.colors.info, config.colors.success],
      stroke: {
        width: 5,
        colors: [cardColor]
      },
      dataLabels: {
        enabled: false,
        formatter: function (val, opt) {
          return parseInt(val) + '%';
        }
      },
      legend: {
        show: false
      },
      grid: {
        padding: {
          top: 0,
          bottom: 0,
          right: 15
        }
      },
      states: {
        hover: {
          filter: { type: 'none' }
        },
        active: {
          filter: { type: 'none' }
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: false,
              value: {
                fontSize: '1.5rem',
                fontFamily: 'Public Sans',
                color: headingColor,
                offsetY: 55,
                formatter: function (val) {
                  return parseInt(val);
                }
              },
              name: {
                offsetY: 20,
                fontFamily: 'Public Sans'
              }
            }
          }
        }
      }
    };


  // B.2 Grafico linea comparativa tiempo actual con anterior
  // --------------------------------------------------------------------
  // Shipment statistics Chart
  // --------------------------------------------------------------------
  const emailsLineasTipo = document.querySelector('#emailsLineasTipo'),
   emailsLineasTipoConfig = {
      series: [
	   {
          name: 'Varices',
          type: 'line',
          data: [30, 45, 33, 38, 22, 40, 48, 40, 42, 37]
        },
        {
          name: 'Úlcera variscosa',
          type: 'line',
          data: [38, 25, 43, 28, 32, 40, 48, 40, 22, 37]
        },
        {
          name: 'Hemorroides',
          type: 'line',
          data: [23, 28, 23, 32, 28, 44, 32, 38, 26, 34]
        }
      ],
      chart: {
        height: 270,
        type: 'line',
        stacked: false,
        parentHeightOffset: 0,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      stroke: {
        curve: 'smooth',
        width: [2, 2,2,2],
        lineCap: 'round'
      },
      legend: {
        show: true,
        position: 'bottom',
        markers: {
          width: 8,
          height: 8,
          offsetX: -3
        },
        height: 40,
        offsetY: 10,
        itemMargin: {
          horizontal: 10,
          vertical: 0
        },
        fontSize: '15px',
        fontFamily: 'Public Sans',
        fontWeight: 400,
        labels: {
          colors: headingColor,
          useSeriesColors: false
        },
        offsetY: 10
      },
      grid: {
        strokeDashArray: 8
      },
      colors: ['#03C3EC','#C38DF7','#f59330','#85a29e'],
      fill: {
        opacity: [1, 1]
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
          startingShape: 'rounded',
          endingShape: 'rounded',
          borderRadius: 4
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        tickAmount: 10,
        categories: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan', '9 Jan', '10 Jan'],
        labels: {
          style: {
            colors: labelColor,
            fontSize: '13px',
            fontFamily: 'Public Sans',
            fontWeight: 400
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        tickAmount: 7,
        min: 0,
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
            fontFamily: 'Public Sans',
            fontWeight: 400
          },
          formatter: function (val) {
            return Math.round(val);
          }
        }
      },
      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 270
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: '10px'
                }
              }
            },
            legend: {
              itemMargin: {
                vertical: 0,
                horizontal: 10
              },
              fontSize: '13px',
              offsetY: 12
            }
          }
        },
        {
          breakpoint: 1399,
          options: {
            chart: {
              height: 415
            },
            plotOptions: {
              bar: {
                columnWidth: '50%'
              }
            }
          }
        },
        {
          breakpoint: 982,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '30%'
              }
            }
          }
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 250
            },
            legend: {
              offsetY: 7
            }
          }
        }
      ]
    };

  
  
  
  
  
  // B. Nº emails por clínicas
  // --------------------------------------------------------------------
const emailsClinicasTiempo = document.querySelector('#emailsClinicasTiempo'),
    emailsClinicasTiempoOptions = {
      chart: {
        height: 200,
        toolbar: { show: false },
        zoom: { enabled: false },
        type: 'line',
        dropShadow: {
          enabled: true,
          enabledOnSeries: [1],
          top: 13,
          left: 4,
          blur: 3,
          color: config.colors.primary,
          opacity: 0.09
        }
      },
      series: [
        {
          name: 'Tipo tratamiento 1',
          data: [20, 54, 20, 38, 22, 28, 16, 19,20, 54, 20, 38, 22, 28]
        },
        {
          name: 'Tipo tratamiento 2',
          data: [20, 32, 22, 65, 40, 46, 34, 70,20, 32, 22, 65, 40, 46]
        }
		,
        {
          name: 'Tipo tratamiento 3',
          data: [70,20, 32, 22, 65, 40, 46, 34, 70,20, 32, 22, 65, 40]
        }
		,
        {
          name: 'Tipo tratamiento 4',
          data: [34, 70,20, 32, 22, 65, 40, 46, 34, 70,20, 32, 22, 65 ]
        }
      ],
      stroke: {
        curve: 'smooth',
        dashArray: [0, 0,0,0],
        width: [2, 2,2,2]
      },
      legend: {
        show: false
      },

	   colors: ['#9e1e4c','#ff1168','#f59330','#85a29e'],
      grid: {
        show: false,
        borderColor: borderColor,
        padding: {
          top: -20,
          bottom: -10,
          left: 0
        }
      },
      xaxis: {
        labels: {
          show: false, // Oculta los valores en el eje x
          style: {
            colors: labelColor,
            fontSize: '13px'
          }
        },
        axisTicks: {
          show: false
        },
        categories: ['11 Enero 2023', '12 Enero 2023', '13 Enero 2023', '14 Enero 2023', '15 Enero 2023', '16 Enero 2023', 'Jun', 'Jul'],
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        show: true // Muestra los valores en el eje y (esta es la configuración predeterminada, pero la he incluido para mayor claridad)
      }
    };

  if (typeof emailsClinicasTiempo !== undefined && emailsClinicasTiempo !== null) {
    const emailsClinicasTiempoEs = new ApexCharts(emailsClinicasTiempo, emailsClinicasTiempoOptions);
    emailsClinicasTiempoEs.render();
  }
 
// C. Franja HOraria y D. Contactar por
     //radial Barchart

  function radialBarChartContacto(color, value, show) {
    const radialBarChartOpt = {
      chart: {
        height: show == 'true' ? 110 : 0,
        width: show == 'true' ? 110 : 0,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: show == 'true' ? '45%' : '25%'
          },
          dataLabels: {
            show: show == 'true' ? true : false,
            value: {
              offsetY: -10,
              fontSize: '15px',
              fontWeight: 500,
              fontFamily: 'Public Sans',
              color: headingColor
            }
          },
          track: {
            background: config.colors_label.secondary
          }
        }
      },
      stroke: {
        lineCap: 'round'
      },
      colors: [color],
      grid: {
        padding: {
          top: show == 'true' ? -12 : -15,
          bottom: show == 'true' ? -17 : -15,
          left: show == 'true' ? -17 : -5,
          right: -15
        }
      },
      series: [value],
      labels: show == 'true' ? [''] : ['Progress']
    };
    return radialBarChartOpt;
  }

  
  
  //  E. Emains por tratamiento en cada clínica 
  // --------------------------------------------------------------------
  const deliveryExceptionsChartE1 = document.querySelector('#deliveryExceptionsChart'),
    deliveryExceptionsChartConfig = {
      chart: {
        height: 420,
        parentHeightOffset: 0,
        type: 'donut'
      },
      labels: ['Madrid: 200 emails', 'Barcelona:140 emails', 'Granada: 250 emails', 'Coruña: 300 emails'],
      series: [13, 25, 22, 40],
     colors: ['#03C3EC','#C38DF7','#f59330','#85a29e'],
      stroke: {
        width: 0
      },
      dataLabels: {
        enabled: false,
        formatter: function (val, opt) {
          return parseInt(val) + '%';
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        offsetY: 10,
        markers: {
          width: 8,
          height: 8,
          offsetX: -3
        },
        itemMargin: {
          horizontal: 15,
          vertical: 5
        },
        fontSize: '13px',
        fontFamily: 'Public Sans',
        fontWeight: 400,
        labels: {
          colors: headingColor,
          useSeriesColors: false
        }
      },
      tooltip: {
        theme: false
      },
      grid: {
        padding: {
          top: 15
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              value: {
                fontSize: '26px',
                fontFamily: 'Public Sans',
                color: headingColor,
                fontWeight: 500,
                offsetY: -30,
                formatter: function (val) {
                  return parseInt(val) + '%';
                }
              },
              name: {
                offsetY: 20,
                fontFamily: 'Public Sans'
              },
              total: {
                show: true,
                fontSize: '0.8rem',
                label: '',
                color: labelColor,
                formatter: function (w) {
                  return '';
                }
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 420,
          options: {
            chart: {
              height: 360
            }
          }
        }
      ]
    };
 
  
    
    
    
    
  
  

  // Overview & Sales Activity - Staked Bar Chart
  // --------------------------------------------------------------------
  const salesActivityChartEl = document.querySelector('#salesActivityChart'),
    salesActivityChartConfig = {
      chart: {
        type: 'bar',
        height: 275,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      series: [
        {
          name: 'PRODUCT A',
          data: [75, 50, 55, 60, 48, 82, 59]
        },
        {
          name: 'PRODUCT B',
          data: [25, 29, 32, 35, 34, 18, 30]
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '40%',
          borderRadius: 10,
          startingShape: 'rounded',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 6,
        lineCap: 'round',
        colors: [cardColor]
      },
      legend: {
        show: false
      },
      colors: [config.colors.danger, '#435971'],
      fill: {
        opacity: 1
      },
      grid: {
        show: false,
        strokeDashArray: 7,
        padding: {
          top: -10,
          bottom: -12,
          left: 0,
          right: 0
        }
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          show: true,
          style: {
            colors: labelColor,
            fontSize: '13px'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false
      },
      responsive: [
        {
          breakpoint: 1440,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '50%'
              }
            }
          }
        },
        {
          breakpoint: 1300,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 11,
                columnWidth: '55%'
              }
            }
          }
        },
        {
          breakpoint: 1200,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '45%'
              }
            }
          }
        },
        {
          breakpoint: 1040,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '50%'
              }
            }
          }
        },
        {
          breakpoint: 992,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 12,
                columnWidth: '40%'
              }
            },
            chart: {
              type: 'bar',
              height: 320
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 11,
                columnWidth: '25%'
              }
            }
          }
        },
        {
          breakpoint: 576,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '35%'
              }
            }
          }
        },
        {
          breakpoint: 440,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '45%'
              }
            }
          }
        },
        {
          breakpoint: 360,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 8,
                columnWidth: '50%'
              }
            }
          }
        }
      ],
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    };
  if (typeof salesActivityChartEl !== undefined && salesActivityChartEl !== null) {
    const salesActivityChart = new ApexCharts(salesActivityChartEl, salesActivityChartConfig);
    salesActivityChart.render();
  }

  // Session Area Chart
  // --------------------------------------------------------------------
  const sessionAreaChartEl = document.querySelector('#sessionsChart'),
    sessionAreaChartConfig = {
      chart: {
        height: 90,
        type: 'area',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        }
      },
      markers: {
        size: 6,
        colors: 'transparent',
        strokeColors: 'transparent',
        strokeWidth: 4,
        discrete: [
          {
            fillColor: config.colors.white,
            seriesIndex: 0,
            dataPointIndex: 8,
            strokeColor: config.colors.warning,
            strokeWidth: 2,
            size: 6,
            radius: 8
          }
        ],
        hover: {
          size: 7
        }
      },
      grid: {
        show: false,
        padding: {
          right: 8
        }
      },
      colors: [config.colors.warning],
      fill: {
        type: 'gradient',
        gradient: {
          shade: shadeColor,
          shadeIntensity: 0.8,
          opacityFrom: 0.8,
          opacityTo: 0.25,
          stops: [0, 95, 100]
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: 'straight'
      },
      series: [
        {
          data: [280, 280, 240, 240, 200, 200, 260, 260, 310]
        }
      ],
      xaxis: {
        show: false,
        lines: {
          show: false
        },
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        show: false
      }
    };
  if (typeof sessionAreaChartEl !== undefined && sessionAreaChartEl !== null) {
    const sessionAreaChart = new ApexCharts(sessionAreaChartEl, sessionAreaChartConfig);
    sessionAreaChart.render();
  }

  // Order Statistics Chart
  // --------------------------------------------------------------------
  const leadsReportChartEl = document.querySelector('#leadsReportChart'),
    leadsReportChartConfig = {
      chart: {
        height: 157,
        width: 135,
        parentHeightOffset: 0,
        type: 'donut'
      },
      labels: ['Electronic', 'Sports', 'Decor', 'Fashion'],
      series: [45, 58, 30, 50],
      colors: [
        chartColors.donut.series1,
        chartColors.donut.series2,
        chartColors.donut.series3,
        chartColors.donut.series4
      ],
      stroke: {
        width: 0
      },
      dataLabels: {
        enabled: false,
        formatter: function (val, opt) {
          return parseInt(val) + '%';
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        theme: false
      },
      grid: {
        padding: {
          top: 5,
          bottom: 5
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              value: {
                fontSize: '1.5rem',
                fontFamily: 'Public Sans',
                color: headingColor,
                fontWeight: 500,
                offsetY: -15,
                formatter: function (val) {
                  return parseInt(val) + '%';
                }
              },
              name: {
                offsetY: 20,
                fontFamily: 'Public Sans'
              },
              total: {
                show: true,
                fontSize: '.7rem',
                label: '1 Week',
                color: legendColor,
                formatter: function (w) {
                  return '32%';
                }
              }
            }
          }
        }
      }
    };
  if (typeof leadsReportChartEl !== undefined && leadsReportChartEl !== null) {
    const leadsReportChart = new ApexCharts(leadsReportChartEl, leadsReportChartConfig);
    leadsReportChart.render();
  }

  // Earning Reports Bar Chart
  // --------------------------------------------------------------------
  const reportBarChartEl = document.querySelector('#reportBarChart'),
    reportBarChartConfig = {
      chart: {
        height: 120,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          barHeight: '60%',
          columnWidth: '50%',
          startingShape: 'rounded',
          endingShape: 'rounded',
          borderRadius: 4,
          distributed: true
        }
      },
      grid: {
        show: false,
        padding: {
          top: -35,
          bottom: -10,
          left: -10,
          right: -10
        }
      },
      colors: [
        config.colors_label.primary,
        config.colors_label.primary,
        config.colors_label.primary,
        config.colors_label.primary,
        config.colors.primary,
        config.colors_label.primary,
        config.colors_label.primary
      ],
      dataLabels: {
        enabled: false
      },
      series: [
        {
          data: [40, 95, 60, 45, 90, 50, 75]
        }
      ],
      legend: {
        show: false
      },
      xaxis: {
        categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '13px'
          }
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      }
    };
  if (typeof reportBarChartEl !== undefined && reportBarChartEl !== null) {
    const barChart = new ApexCharts(reportBarChartEl, reportBarChartConfig);
    barChart.render();
  }

  // Sales Analytics - Heat map chart
  // --------------------------------------------------------------------
  const salesAnalyticsChartEl = document.querySelector('#salesAnalyticsChart'),
    salesAnalyticsChartConfig = {
      chart: {
        height: 350,
        type: 'heatmap',
        parentHeightOffset: 0,
        offsetX: -10,
        toolbar: {
          show: false
        }
      },
      series: [
        {
          name: '1k',
          data: [
            { x: 'Jan', y: '250' },
            { x: 'Feb', y: '350' },
            { x: 'Mar', y: '220' },
            { x: 'Apr', y: '290' },
            { x: 'May', y: '650' },
            { x: 'Jun', y: '260' },
            { x: 'Jul', y: '274' },
            { x: 'Aug', y: '850' }
          ]
        },
        {
          name: '2k',
          data: [
            { x: 'Jan', y: '750' },
            { x: 'Feb', y: '3350' },
            { x: 'Mar', y: '1220' },
            { x: 'Apr', y: '1290' },
            { x: 'May', y: '1650' },
            { x: 'Jun', y: '1260' },
            { x: 'Jul', y: '1274' },
            { x: 'Aug', y: '850' }
          ]
        },
        {
          name: '3k',
          data: [
            { x: 'Jan', y: '375' },
            { x: 'Feb', y: '1350' },
            { x: 'Mar', y: '3220' },
            { x: 'Apr', y: '2290' },
            { x: 'May', y: '2650' },
            { x: 'Jun', y: '2260' },
            { x: 'Jul', y: '1274' },
            { x: 'Aug', y: '815' }
          ]
        },
        {
          name: '4k',
          data: [
            { x: 'Jan', y: '575' },
            { x: 'Feb', y: '1350' },
            { x: 'Mar', y: '2220' },
            { x: 'Apr', y: '3290' },
            { x: 'May', y: '3650' },
            { x: 'Jun', y: '2260' },
            { x: 'Jul', y: '1274' },
            { x: 'Aug', y: '315' }
          ]
        },
        {
          name: '5k',
          data: [
            { x: 'Jan', y: '875' },
            { x: 'Feb', y: '1350' },
            { x: 'Mar', y: '2220' },
            { x: 'Apr', y: '3290' },
            { x: 'May', y: '3650' },
            { x: 'Jun', y: '2260' },
            { x: 'Jul', y: '1274' },
            { x: 'Aug', y: '965' }
          ]
        },
        {
          name: '6k',
          data: [
            { x: 'Jan', y: '575' },
            { x: 'Feb', y: '1350' },
            { x: 'Mar', y: '2220' },
            { x: 'Apr', y: '2290' },
            { x: 'May', y: '2650' },
            { x: 'Jun', y: '3260' },
            { x: 'Jul', y: '1274' },
            { x: 'Aug', y: '815' }
          ]
        },
        {
          name: '7k',
          data: [
            { x: 'Jan', y: '575' },
            { x: 'Feb', y: '1350' },
            { x: 'Mar', y: '1220' },
            { x: 'Apr', y: '1290' },
            { x: 'May', y: '1650' },
            { x: 'Jun', y: '1260' },
            { x: 'Jul', y: '3274' },
            { x: 'Aug', y: '815' }
          ]
        },
        {
          name: '8k',
          data: [
            { x: 'Jan', y: '575' },
            { x: 'Feb', y: '350' },
            { x: 'Mar', y: '220' },
            { x: 'Apr', y: '290' },
            { x: 'May', y: '650' },
            { x: 'Jun', y: '260' },
            { x: 'Jul', y: '274' },
            { x: 'Aug', y: '815' }
          ]
        }
      ],
      plotOptions: {
        heatmap: {
          enableShades: false,
          radius: '6px',
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 1000,
                name: '1k',
                color: heatMap1
              },
              {
                from: 1001,
                to: 2000,
                name: '2k',
                color: heatMap2
              },
              {
                from: 2001,
                to: 3000,
                name: '3k',
                color: heatMap3
              },
              {
                from: 3001,
                to: 4000,
                name: '4k',
                color: heatMap4
              }
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 4,
        colors: [cardColor]
      },
      legend: {
        show: false
      },
      grid: {
        show: false,
        padding: {
          top: -10,
          left: 10,
          right: -15,
          bottom: 0
        }
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            colors: labelColor,
            fontSize: '13px'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
            fontSize: '13px'
          }
        }
      },
      responsive: [
        {
          breakpoint: 1441,
          options: {
            chart: {
              height: '325px'
            },
            grid: {
              padding: {
                right: -15
              }
            }
          }
        },
        {
          breakpoint: 1045,
          options: {
            chart: {
              height: '300px'
            },
            grid: {
              padding: {
                right: -50
              }
            }
          }
        },
        {
          breakpoint: 992,
          options: {
            chart: {
              height: '320px'
            },
            grid: {
              padding: {
                right: -50
              }
            }
          }
        },
        {
          breakpoint: 767,
          options: {
            chart: {
              height: '400px'
            },
            grid: {
              padding: {
                right: 0
              }
            }
          }
        },
        {
          breakpoint: 568,
          options: {
            chart: {
              height: '330px'
            },
            grid: {
              padding: {
                right: -20
              }
            }
          }
        }
      ],
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    };
  if (typeof salesAnalyticsChartEl !== undefined && salesAnalyticsChartEl !== null) {
    const salesAnalyticsChart = new ApexCharts(salesAnalyticsChartEl, salesAnalyticsChartConfig);
    salesAnalyticsChart.render();
  }

  // Sale Stats - Radial Bar Chart
  // --------------------------------------------------------------------
  const salesStatsEl = document.querySelector('#salesStats'),
    salesStatsOptions = {
      chart: {
        height: 340,
        type: 'radialBar'
      },
      series: [75],
      labels: ['Sales'],
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          strokeWidth: '70',
          hollow: {
            margin: 50,
            size: '75%',
            image: assetsPath + 'img/icons/misc/arrow-star.png',
            imageWidth: 65,
            imageHeight: 55,
            imageOffsetY: -35,
            imageClipped: false
          },
          track: {
            strokeWidth: '50%',
            background: borderColor
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: 60,
              show: true,
              color: labelColor,
              fontSize: '15px'
            },
            value: {
              formatter: function (val) {
                return parseInt(val) + '%';
              },
              offsetY: 20,
              color: headingColor,
              fontSize: '32px',
              show: true
            }
          }
        }
      },
      fill: {
        type: 'solid',
        colors: config.colors.success
      },
      stroke: {
        lineCap: 'round'
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    };
  if (typeof salesStatsEl !== undefined && salesStatsEl !== null) {
    const salesStats = new ApexCharts(salesStatsEl, salesStatsOptions);
    salesStats.render();
  }

