// Define colors
const COLOR_1 = '#4f46e5' // indigo-600
const COLOR_3 = '#10b981' // emerald-500

// Default chart configurations
const ApexChartDefault = {
    type: 'line',
    zoom: {
        enabled: false
    },
    toolbar: {
        show: false
    }
}

const ApexBarDefault = {
    chart: {
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        type: "bar",
        height: 300
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '30px',
            borderRadius: 2,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 6,
        curve: 'smooth',
        colors: ['transparent'],
    },
    legend: {
        itemMargin: {
            vertical: 10,
        }
    }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeCalendar();
});

function initializeCharts() {
    const taskChartElement = document.querySelector("#task-overview-chart");
    if (taskChartElement) {
        const taskOverviewChartOption = {
            series: [
                {
                    name: 'On Going',
                    data: [45, 52, 68, 84, 103, 112, 126],
                    color: COLOR_1
                },
                {
                    name: 'Finished', 
                    data: [35, 41, 62, 62, 75, 81, 87],
                    color: COLOR_3
                },
            ],
            chart: {
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
                type: "bar",
                height: 300
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '30px',
                    borderRadius: 2,
                },
            },
            xaxis: {
                categories: [
                    '21 Jan',
                    '22 Jan', 
                    '23 Jan',
                    '24 Jan',
                    '25 Jan',
                    '26 Jan',
                    '27 Jan',
                ]
            },
            legend: {
                show: false
            },
        }
        
        try {
            // Make sure ApexCharts is available
            if (typeof ApexCharts !== 'undefined') {
                new ApexCharts(taskChartElement, taskOverviewChartOption).render();
            } else {
                console.error('ApexCharts is not loaded');
            }
        } catch (error) {
            console.error("Error initializing task overview chart:", error);
        }
    }
}

function initializeCalendar() {
    const calendarElement = document.querySelector('.project-calendar');
    if (calendarElement) {
        const newDate = new Date();
        const formattedDate = formatDate(newDate);
        calendarElement.setAttribute('data-date', formattedDate);
    }
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
}