window.onload = function () {
  // 实现列表滑块
  var aLink = document.getElementById("nav").getElementsByTagName("li");
  var oMask = document.getElementById("nav-h");
  for (var i = 0; i < aLink.length; i++) {
    aLink[i].onmouseover = function () {
      startMove(oMask, this.offsetLeft);
      // console.log(this);
    };
  }

  function startMove(a, b) {
    clearInterval(a.timer);
    a.timer = setInterval(function () {
      a.style.left = b + 20 + "px";
    }, 30);
  }
  //   调整外盒宽度
  var img = document.getElementById("img");
  var imgArr = document.getElementsByTagName("img");
  img.style.width = 580 * imgArr.length + "px";

  // 导航居中
  var navDiv = document.getElementById("navDiv");
  var outer = document.getElementById("outer");
  navDiv.style.left = (outer.offsetWidth - navDiv.offsetWidth) / 2 + "px";

  var navA = document.getElementById("navDiv").getElementsByTagName("a");

  index = 0;
  navA[index].style.height = "20px";
  navA[index].style.transition = "all 0.2s linear";
  navA[index].style.marginTop = "0";
  for (let i = 0; i < navA.length; i++) {
    navA[i].onclick = function () {
      index = i;
      img.style.left = -index * 540 + "px";

      setA();
    };
  }
  // 前后切换
  var up = document.getElementById("but1");
  var dowm = document.getElementById("but2");
  for (let i = 0; i < imgArr.length; i++) {
    up.onclick = function () {
      index = index - 1;
      if (index > -1) {
        img.style.left = -index * 540 + "px";
      } else {
        index = 4;
        img.style.left = -index * 540 + "px";
      }
      setA();
    };
    dowm.onclick = function () {
      index = index + 1;
      if (index < 5) {
        img.style.left = -index * 540 + "px";
      } else {
        index = 0;
        img.style.left = -index * 540 + "px";
      }
      setA();
    };
  }
  // 自动轮播计时器
  var time = setInterval(test, 3000);
  var index = 0;
  function test() {
    if (index == imgArr.length - 1) {
      index = 0;
    } else {
      index++;
    }
    img.style.left = -index * 540 + "px";
    setA();
  }
  // 鼠标移入移出
  img.addEventListener("mouseover", function () {
    clearInterval(time);
  });
  img.addEventListener("mouseout", function () {
    time = setInterval(test, 2000);
    function test() {
      if (index == imgArr.length - 1) {
        index = 0;
      } else {
        index++;
      }
      img.style.left = -index * 540 + "px";
      setA();
    }
  });
  // 变化块
  function setA() {
    for (var i = 0; i < navA.length; i++) {
      navA[i].style.height = "";
      navA[i].style.transition = "";
      navA[i].style.marginTop = "";
    }
    navA[index].style.height = "20px";
    navA[index].style.transition = "all 0.2s linear";
    navA[index].style.marginTop = "0";
  }

  var myChart = echarts.init(document.querySelector(".boxT"));
  var myChartR = echarts.init(document.querySelector(".boxr"));

  //发送请求
  const xhr = new XMLHttpRequest();
  //设置响应体数据的类型
  xhr.responseType = "json";
  //初始化
  xhr.open("GET", "https://edu.telking.com/api/?type=month");
  //发送
  xhr.send();
  //事件绑定
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        var option = {
          title: {
            text: "柱状图数据展示",
            left: "center",
          },
          xAxis: {
            type: "category",
            data: xhr.response.data.xAxis,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: xhr.response.data.series,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
              },
            },
          ],
        };
        myChartR.setOption(option);
      }

      var option = {
        title: {
          text: "曲线图数据展示",
          left: "center",
          align: "right",
          top: "30px",
        },
        xAxis: {
          data: xhr.response.data.xAxis,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: xhr.response.data.series,
            type: "line",
            smooth: true,
          },
        ],
      };
      //将配置项设置给echarts实例对象，使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  };
};

const xhl = new XMLHttpRequest();
xhl.responseType = "json";
xhl.open("GET", "https://edu.telking.com/api/?type=week");
xhl.send();
xhl.onreadystatechange = function () {
  if (xhl.readyState === 4) {
    if (xhl.status >= 200 && xhl.status < 300) {
      var myChartL = echarts.init(document.querySelector(".boxl"));
      console.log(xhl.response.data);
      var data = xhl.response.data;
      var series = data.series;
      var xAxis = data.xAxis;
      var option = {
        title: {
          text: "饼状图数据展示",
          left: "center",
        },

        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "周数据",
            type: "pie",
            radius: "50%",
            data: [
              { value: series[0], name: xAxis[0] },
              { value: series[1], name: xAxis[1] },
              { value: series[2], name: xAxis[2] },
              { value: series[3], name: xAxis[3] },
              { value: series[4], name: xAxis[4] },
              { value: series[5], name: xAxis[5] },
              { value: series[6], name: xAxis[6] },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChartL.setOption(option);
    }
  }
};
