document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the input values
    const xData = document.getElementById('xData').value.split(',').map(Number);
    const yData = document.getElementById('yData').value.split(',').map(Number);

    if (xData.length !== yData.length) {
        alert('The number of X and Y values must be the same.');
        return;
    }

    // Calculate the sums
    const sumX = xData.reduce((a, b) => a + b, 0);
    const sumY = yData.reduce((a, b) => a + b, 0);
    const sumXY = xData.reduce((sum, x, i) => sum + x * yData[i], 0);
    const sumX2 = xData.reduce((sum, x) => sum + x * x, 0);
    const sumY2 = yData.reduce((sum, y) => sum + y * y, 0);

    // Calculate the averages
    const n = xData.length;
    const avgX = sumX / n;
    const avgY = sumY / n;

    // Calculate the covariance
    const covXY = sumXY / n - avgX * avgY;

    // Calculate the standard deviations
    const sigmaX = Math.sqrt(sumX2 / n - avgX * avgX);
    const sigmaY = Math.sqrt(sumY2 / n - avgY * avgY);

    // Calculate the correlation coefficient
    const r = (covXY / (sigmaX * sigmaY));

    // Calculate the Bxy
    const bxy = r*(sigmaX/sigmaY);
    
    // Calculate the Byx
    const byx = r*(sigmaY/sigmaX);

    // Display the results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>Results</h2>
        <p>N: ${n}</p>
        <p>Sum X: ${sumX}</p>
        <p>Sum Y: ${sumY}</p>
        <p>Sum XY: ${sumXY}</p>
        <p>Sum X²: ${sumX2}</p>
        <p>Sum Y²: ${sumY2}</p>
        <p>Avg X: ${avgX.toFixed(4)}</p>
        <p>Avg Y: ${avgY.toFixed(4)}</p>
        <p>Cov(X, Y): ${covXY.toFixed(4)}</p>
        <p>Sigma X: ${sigmaX.toFixed(4)}</p>
        <p>Sigma Y: ${sigmaY.toFixed(4)}</p>
        <p>Correlation Coefficient: ${r.toFixed(2)}</p>

        <p>Bxy: ${bxy.toFixed(4)}</p>
        <p>Byx: ${byx.toFixed(4)}</p>


    <hr>

    <center class="red">Jay Borse </center>
    `;
});
