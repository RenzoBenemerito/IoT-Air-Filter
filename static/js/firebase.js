
// Initialize Firebase
var config = {
    apiKey: "IgFVdRfhGK0JUWbBdu2oludVJwika7IST1MUExRs",
    authDomain: "air-quality-4bf18.firebaseapp.com",
    databaseURL: "https://air-quality-4bf18.firebaseio.com",
    projectId: "air-quality-4bf18",
    storageBucket: "air-quality-4bf18.appspot.com",
};
firebase.initializeApp(config);
var d = new Date(); // for now
var h = d.getHours(); // => 9
var m = d.getMinutes(); // =>  30
var s = d.getSeconds(); // => 51
var capture = false;
var val = 0;
var ref = firebase.database().ref().child("Dust Density");
var stopping = false;
var table = [];
ref.on("value", function(snapshot) {
    val = snapshot.val()*100;
    console.log(val);
    progress(val);
    updateReport(val);
    if(capture == true){
      d = new Date(); // for now
      h = d.getHours(); // => 9
      m = d.getMinutes(); // =>  30
      s = d.getSeconds(); // => 51
      table.push([h+":"+m+":"+s,val])
    }
}, function (error) {
console.log("Error: " + error.code);
});
var int = 0

// setInterval(update, 1000);
//     function update(){ 
//       val+=Math.random() * (100+0) +0;
//       if(val > 100){
//         val-=100;
//       } 
//       if(capture == true){
//         d = new Date(); // for now
//         h = d.getHours(); // => 9
//         m = d.getMinutes(); // =>  30
//         s = d.getSeconds(); // => 51
//         table.push([h+":"+m+":"+s,val])
//       }
//       progress(val);
//       console.log(val);
//       updateReport(val);
//     }


var myChart;
try {

    // Recent Report 2
    const bd_brandProduct2 = 'rgba(0,181,233,0.9)'
    const bd_brandService2 = 'rgba(0,173,95,0.9)'
    const brandProduct2 = 'rgba(0,181,233,0.2)'
    const brandService2 = 'rgba(0,173,95,0.2)'

    var data3 = []
    

    var ctx = document.getElementById("recent-rep2-chart");
    if (ctx) {
      ctx.height = 230;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
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
function updateReport(val){
var len = myChart.data.datasets[0].data.length
var d = new Date(); // for now
var h = d.getHours(); // => 9
var m = d.getMinutes(); // =>  30
var s = d.getSeconds(); // => 51
if(len>30){
  myChart.data.datasets[0].data.shift();
  myChart.data.labels.shift();
  myChart.data.datasets[0].data[len-1] = val;
  myChart.data.labels[len-1] = h+":"+m+":"+s;
  myChart.update();
}
else{
  myChart.data.datasets[0].data[len] = val;
  myChart.data.labels[len] = h+":"+m+":"+s;
  myChart.update();
}

}
  


//Dust Level
function progress(val){
try {
    if(val > 100){
      val = 100;
    }
    var progressbarSimple = $('.js-progressbar-simple');
    progressbarSimple.each(function () {
      var that = $(this);
      var executed = false;
      
      $("#dustLevel").attr("data-transitiongoal", val);
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

$("#capture_excel").click(function(){
var item = [];
var d = new Date(); // for now
var h = d.getHours(); // => 9
var m = d.getMinutes(); // =>  30
var s = d.getSeconds(); // => 51
var time = h+":"+m+":"+s;
console.log(val);
console.log(time);
var value = $(this).attr("data-value");
if(value == "Capture Data"){
  $(this).css("background-color","#ff1744");
  $(this).text("Stop");
  $(this).attr("data-value","Stop");
  $(this).prepend("<i id='capture_icon' class='zmdi zmdi-archive'></i>");
  $("#capture_icon").attr("class","zmdi zmdi-stop");
  capture = true;
}
else if(value == "Stop"){
  $(this).css("background-color","#63c76a");
  $(this).text("Capture Data");
  $(this).attr("data-value","Capture Data");
  $(this).prepend("<i id='capture_icon' class='zmdi zmdi-stop'></i>");
  $("#capture_icon").attr("class","zmdi zmdi-archive");
  capture = false;
  // $.ajax({
  //   url: "reports/",
  //   type: "POST",
  //   data: { 'data_report[]': table,
  //           csrfmiddlewaretoken: window.CSRF_TOKEN },
  //   success: function(){
  //     alert("Capture Success!");
  //   }
  // });
  var dataJson = JSON.stringify({'data':table});
  var data = {'data_report': dataJson,
               csrfmiddlewaretoken: window.CSRF_TOKEN};
  console.log(data);
  post(data);
  table = [];
}

});
function post(params) {
  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  var form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", "reports/");

  for(var key in params) {
      if(params.hasOwnProperty(key)) {
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", params[key]);

          form.appendChild(hiddenField);
      }
  }

  document.body.appendChild(form);
  form.submit();
}
    
  


