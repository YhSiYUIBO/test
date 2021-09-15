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
  // 指定配置项和数据
  var option = {
    title: {
      text: "曲线图数据展示",
      left: "center",
      align: "right",
      top: "30px",
    },
    xAxis: {
      data: [
        "08/17",
        "08/18",
        "08/19",
        "08/20",
        "08/21",
        "08/22",
        "08/23",
        "08/24",
        "08/25",
        "08/26",
        "08/27",
        "08/28",
        "08/29",
        "08/30",
        "08/31",
        "09/01",
        "09/02",
        "09/03",
        "09/04",
        "09/05",
        "09/06",
        "09/07",
        "09/08",
        "09/09",
        "09/10",
        "09/11",
        "09/12",
        "09/13",
        "09/14",
        "09/15",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [
          8554, 8325, 1457, 8854, 2977, 6123, 4709, 8376, 8759, 1839, 9337,
          7960, 4758, 7607, 5149, 4402, 7273, 3057, 6696, 4681, 1888, 7604,
          6135, 901, 1724, 553, 8294, 3275, 2996, 9243,
        ],
        type: "line",
        smooth: true,
      },
    ],
  };
  //将配置项设置给echarts实例对象，使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);

  var myChartL = echarts.init(document.querySelector(".boxl"));

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
          { value: 4468, name: "Mon" },
          { value: 7734, name: "Tue" },
          { value: 7456, name: "Wed" },
          { value: 4814, name: "Thu" },
          { value: 1461, name: "Fri" },
          { value: 4854, name: "Sat" },
          { value: 2980, name: "Sun" },
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

  var myChartR = echarts.init(document.querySelector(".boxr"));

  var option = {
    title: {
      text: "柱状图数据展示",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [9136, 3484, 4758, 379, 368, 340, 2021],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
  myChartR.setOption(option);
};
