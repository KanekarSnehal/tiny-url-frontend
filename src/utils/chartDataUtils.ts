function buildEngagementChartData(data: any) {
    const engagementChartData = {
        datasets: [{
            label: 'Clicks',
            borderWidth: 1,
            maxBarThickness: 100,
            categoryPercentage: 1,
            data: data.reduce((acc: any[], e: { date: string, clicks: number }) => {
                const date = new Date(e.date);
                const month = date.toLocaleString('default', { month: 'short' });
                const year = date.getFullYear();
                // store in format MMM YYYY : clicks
                const label = `${month} ${year}`;
                const index = acc.findIndex((e) => e.label === label);
                if (index === -1) {
                    acc.push({ label, clicks: e.clicks });
                } else {
                    acc[index].clicks += e.clicks;
                }
                return acc;
            }, []),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            parsing: {
                xAxisKey: 'label',
                yAxisKey: 'clicks'
            },
        }]
    }
    return engagementChartData; 
}

function buildLocationsChartData(data: any) {
    const locationsChartData = {
        datasets: [{
            borderWidth: 1,
            label: 'Clicks',
            maxBarThickness: 100,
            categoryPercentage: 1,
            data: data.reduce((acc: any[], e: { country: string, city: string, clicks: number }) => {
                const index = acc.findIndex((el) => el.label === e.country);
                if (index === -1) {
                    acc.push({ label: `${e.city}, ${e.country}`, clicks: e.clicks });
                } else {
                    acc[index].clicks += e.clicks;
                }
                return acc;
            }, []),
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgb(75, 192, 192)',
                'rgb(201, 203, 207)',
                'rgb(54, 162, 235)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(153, 102, 255)',
                'rgb(255, 99, 132)',
            ],
            parsing: {
                xAxisKey: 'label',
                yAxisKey: 'clicks'
            },
        }]
    }
    return locationsChartData;
}

function buildDeviceChartData(data: any) {
    const deviceChartData = {
        labels: data.map((e: { browser: string, os: string, device_type: string }) => `${e.device_type} - ${e.browser} - ${e.os}`),
        datasets: [{
            label: 'Clicks',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(201, 203, 207)',
                'rgb(54, 162, 235)',
                'rgb(255, 159, 64)',
                'rgb(153, 102, 255)',
            ],
            data: data.map((e: { clicks: number }) => e.clicks),
        }],
    }
    return deviceChartData;
}

export { buildEngagementChartData, buildLocationsChartData, buildDeviceChartData };