
    // Initialize Firebase
    var config = {
        apiKey: "IgFVdRfhGK0JUWbBdu2oludVJwika7IST1MUExRs",
        authDomain: "air-quality-4bf18.firebaseapp.com",
        databaseURL: "https://air-quality-4bf18.firebaseio.com",
        projectId: "air-quality-4bf18",
        storageBucket: "air-quality-4bf18.appspot.com",
    };
    firebase.initializeApp(config);
    
    var val;
    var ref = firebase.database().ref().child("Dust Density");

    ref.on("value", function(snapshot) {
        val = snapshot.val()
        console.log(val)
        
        progress(val);
    }, function (error) {
    console.log("Error: " + error.code);
    });

    
    function history(){
        try {

            // Recent Report 2
            const bd_brandProduct2 = 'rgba(0,181,233,0.9)'
            const bd_brandService2 = 'rgba(0,173,95,0.9)'
            const brandProduct2 = 'rgba(0,181,233,0.2)'
            const brandService2 = 'rgba(0,173,95,0.2)'
        
            var data3 = [52, 60, 55, 50, 65, 80, 57, 70, 105, 115]
           
        
            var ctx = document.getElementById("recent-rep2-chart");
            if (ctx) {
              ctx.height = 230;
              var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', ''],
                  datasets: [
                    {
                      label: 'Dust Level',
                      backgroundColor: brandProduct2,
                      borderColor: bd_brandProduct2,
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 0,
                      data: data3
        
                    },
                    // {
                    //   label: 'My Second dataset',
                    //   backgroundColor: brandProduct2,
                    //   borderColor: bd_brandProduct2,
                    //   pointHoverBackgroundColor: '#fff',
                    //   borderWidth: 0,
                    //   data: data4
        
                    // }
                  ]
                },
                options: {
                  maintainAspectRatio: true,
                  legend: {
                    display: false
                  },
                  responsive: true,
                  scales: {
                    xAxes: [{
                      gridLines: {
                        drawOnChartArea: true,
                        color: '#f2f2f2'
                      },
                      ticks: {
                        fontFamily: "Poppins",
                        fontSize: 12
                      }
                    }],
                    yAxes: [{
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: 50,
                        max: 150,
                        fontFamily: "Poppins",
                        fontSize: 12
                      },
                      gridLines: {
                        display: true,
                        color: '#f2f2f2'
        
                      }
                    }]
                  },
                  elements: {
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3
                    },
                    line: {
                      tension: 0
                    }
                  }
        
        
                }
              });
            }
        
          } catch (error) {
            console.log(error);
          }
    }
    
      

//Dust Level
   function progress(val){
    try {
        var progressbarSimple = $('.js-progressbar-simple');
        progressbarSimple.each(function () {
          var that = $(this);
          var executed = false;
         
          $("#dustLevel").attr("data-transitiongoal", val*-100);
            that.waypoint(function () {
              if (!executed) {
                executed = true;
                /*progress bar*/
                that.progressbar({
                  update: function (val, $this) {
                    $this.find('.js-value').html(val + '%');
                  }
                });
              }
            }, {
                offset: 'bottom-in-view'
              });
    
          
        });
      } catch (err) {
        console.log(err);
    }
   }
        
    
        
     
    

    