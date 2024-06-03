
// Hàm để tạo giá trị ngẫu nhiên trong khoảng min và max
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Hàm để cập nhật giá trị và màu sắc của các ô
function updateValues() {
    const temperatureElement = document.getElementById("temperature");
    const humidityElement = document.getElementById("humidity");
    const lightElement = document.getElementById("light");

    // Tạo giá trị ngẫu nhiên cho nhiệt độ (từ -20°C đến 40°C)
    const randomTemperature = getRandomValue(-20, 60);
    temperatureElement.textContent = randomTemperature + "°C";
    setColorForTemperature(temperatureElement, randomTemperature);

    // Tạo giá trị ngẫu nhiên cho độ ẩm (từ 20% đến 80%)
    const randomHumidity = getRandomValue(20, 80);
    humidityElement.textContent = randomHumidity + "%";
    setColorForHumidity(humidityElement, randomHumidity);

    // Tạo giá trị ngẫu nhiên cho ánh sáng (từ 50 Lux đến 1000 Lux)
    const randomLight = getRandomValue(50, 1000);
    lightElement.textContent = randomLight + " Lux";
    setColorForLight(lightElement, randomLight);
}

// Hàm để xác định màu sắc cho nhiệt độ dựa trên giá trị
function setColorForTemperature(element, temperature) {
    if (temperature < 0) {
        element.style.backgroundColor = "blue";
        element.style.color = "white";
    } else if (temperature < 25) {
        element.style.backgroundColor = "green";
        element.style.color = "black";
    } else if (temperature < 40) {
        element.style.backgroundColor = "orange";
        element.style.color = "white";
    } else {
        element.style.backgroundColor = "red" ;
        element.style.color = "black" ;
    }
}

// Hàm để xác định màu sắc cho độ ẩm dựa trên giá trị
function setColorForHumidity(element, humidity) {
    if (humidity < 30) {
        element.style.backgroundColor = "yellow";
        element.style.color = "black";
    } else if (humidity < 50) {
        element.style.backgroundColor = "burlywood";
        element.style.color = "white";
    } else if (humidity < 65) {
        element.style.backgroundColor = "blue";
        element.style.color = "black";
    } else {
        element.style.backgroundColor = "brown" ;
        element.style.color = "white" ;

    }
}

// Hàm để xác định màu sắc cho ánh sáng dựa trên giá trị
function setColorForLight(element, light) {
    if (light < 200) {
        element.style.backgroundColor = "gray";
        element.style.color = "black";
    } else if (light < 600) {
        element.style.backgroundColor = "orange";
        element.style.color = "white";
    } else if(light < 800) {
        element.style.backgroundColor = "violet";
        element.style.color = "black";
    }else {
        element.style.backgroundColor = "blueviolet" ;
        element.style.color = "white" ;
    }
}
// Gọi hàm cập nhật giá trị ban đầu
updateValues();

// Cập nhật giá trị và màu sắc mỗi giây nếu muốn điều chỉnh (hoặc bất kỳ khoảng thời gian nào bạn muốn)
setInterval(updateValues, 2000); // Cập nhật mỗi  giây nếu cần điều chỉnh

// Lấy tham chiếu đến thanh ghi (sidebar) và nút mở/đóng sidebar
const sidebar = document.getElementById("sidebar");
const openbtn = document.getElementById("openbtn");

// Sự kiện khi người dùng nhấp vào nút mở sidebar
openbtn.addEventListener("click", () => {
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
});
const lightSwitch = document.getElementById("light-switch");
const fanSwitch = document.getElementById("fan-switch");
fanSwitch.addEventListener("change", function() {
    if (this.checked) {
        // Bật công tắc - Thực hiện hành động khi bật
        console.log("Bật công tắc");
    } else {
        // Tắt công tắc - Thực hiện hành động khi tắt
        console.log("Tắt công tắc");
    }
});
const ctx = document.getElementById('combined-chart').getContext('2d');
const colors = ['red', 'blue', 'green'];
const combinedChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Label sẽ được cập nhật sau
        datasets: [
            {
                label: 'Nhiệt độ (°C)',
                borderColor: 'red',
                backgroundColor: 'transparent',
                data: [],
                // yAxisID: 'y-axis-temperature'
            },
            {
                label: 'Độ ẩm (%)',
                borderColor: 'blue' ,
                backgroundColor: 'transparent',
                data: [],
                // yAxisID: 'y-axis-humidity'
            },
            {
                label: 'Ánh sáng (Lux)',
                borderColor: 'green' ,
                backgroundColor: 'transparent',
                data: [],
                // yAxisID: 'y-axis-light'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Thời gian'
                }
            },
            // y: {
            //     position: 'left',
            //     title: {
            //         display: true,
            //         text: 'Giá trị'
            //     }
            // },
            // 'y-axis-humidity': {
            //     position: 'right',
            //     title: {
            //         display: true,
            //         text: 'Độ ẩm (%)'
            //     }
            // },
            // 'y-axis-light': {
            //     position: 'right',
            //     title: {
            //         display: true,
            //         text: 'Ánh sáng (Lux)'
            //     },
            //     grid: {
            //         drawOnChartArea: false
            //     }
            // }
            y: {
                beginAtZero: false, // Bắt đầu từ giá trị khác 0 (ở đây là -20)
                // max: 1000, // Giá trị tối đa là 1000
                // min: -20, // Giá trị tối thiểu là -20
                position: 'left',
                title: {
                    display: true,
                    text: 'Giá trị',
                },
            }    
        }
    }
});

// Hàm để cập nhật biểu đồ
function updateCombinedChart(data) {
    // Cập nhật label (thời gian) - ở đây là số thứ tự từ 0 đến data.length - 1
    combinedChart.data.labels = Array.from({ length: data.temperature.length }, (_, i) => i);

    // Cập nhật dữ liệu cho các đường trên biểu đồ
    combinedChart.data.datasets[0].data = data.temperature;
    combinedChart.data.datasets[1].data = data.humidity;
    combinedChart.data.datasets[2].data = data.light;

    // Cập nhật biểu đồ
    combinedChart.update();
}

// Gọi hàm cập nhật biểu đồ ban đầu
updateCombinedChart({ temperature: [], humidity: [], light: [] });

//Hàm để cập nhật giá trị và biểu đồ
function updateValuesAndChart() {
    const temperatureElement = document.getElementById("temperature");
    const humidityElement = document.getElementById("humidity");
    const lightElement = document.getElementById("light");

    // Tạo giá trị ngẫu nhiên cho nhiệt độ (từ -20°C đến 40°C)
    const randomTemperature = getRandomValue(-20, 60);
    temperatureElement.textContent = `${randomTemperature.toFixed(2)}°C`;

    // Tạo giá trị ngẫu nhiên cho độ ẩm (từ 20% đến 80%)
    const randomHumidity = getRandomValue(20, 80);
    humidityElement.textContent = `${randomHumidity.toFixed(2)}%`;

    // Tạo giá trị ngẫu nhiên cho ánh sáng (từ 50 Lux đến 1000 Lux)
    const randomLight = getRandomValue(50, 1000);
    lightElement.textContent = `${randomLight.toFixed(2)} Lux`;

    // Cập nhật dữ liệu cho biểu đồ
    const chartData = {
        temperature: combinedChart.data.datasets[0].data,
        humidity: combinedChart.data.datasets[1].data,
        light: combinedChart.data.datasets[2].data
    };

    // Thêm giá trị mới vào mảng dữ liệu của biểu đồ
    chartData.temperature.push(randomTemperature);
    chartData.humidity.push(randomHumidity);
    chartData.light.push(randomLight);

    // Loại bỏ phần tử cũ nếu mảng dữ liệu quá dài (ví dụ: giữ lại chỉ 10 điểm gần nhất)
    if (chartData.temperature.length > 20) {
        chartData.temperature.shift();
        chartData.humidity.shift();
        chartData.light.shift();
    }

    // Cập nhật biểu đồ
    updateCombinedChart(chartData);
}
// Gọi hàm cập nhật giá trị ban đầu và biểu đồ
updateValuesAndChart();
// Cập nhật giá trị và biểu đồ mỗi giây (hoặc bất kỳ khoảng thời gian nào bạn muốn)
setInterval(updateValuesAndChart, 2000); // Cập nhật mỗi giây

