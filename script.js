document.getElementById('dataForm').addEventListener('submit', function (event) {
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
    const bxy = r * (sigmaX / sigmaY);

    // Calculate the Byx
    const byx = r * (sigmaY / sigmaX);

    // Display the results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
    <h2>Results</h2>
    <table>
        <tr>
            <th>Metric</th>
            <th>Value</th>
        </tr>
        <tr>
            <td>N</td>
            <td>${n}</td>
        </tr>
        <tr>
            <td>Sum X</td>
            <td>${sumX}</td>
        </tr>
        <tr>
            <td>Sum Y</td>
            <td>${sumY}</td>
        </tr>
        <tr>
            <td>Sum XY</td>
            <td>${sumXY}</td>
        </tr>
        <tr>
            <td>Sum X²</td>
            <td>${sumX2}</td>
        </tr>
        <tr>
            <td>Sum Y²</td>
            <td>${sumY2}</td>
        </tr>
        <tr>
            <td>Avg X</td>
            <td>${avgX.toFixed(4)}</td>
        </tr>
        <tr>
            <td>Avg Y</td>
            <td>${avgY.toFixed(4)}</td>
        </tr>
        <tr>
            <td>Cov(X, Y)</td>
            <td>${covXY.toFixed(4)}</td>
        </tr>
        <tr>
            <td>Sigma X</td>
            <td>${sigmaX.toFixed(4)}</td>
        </tr>
        <tr>
            <td>Sigma Y</td>
            <td>${sigmaY.toFixed(4)}</td>
        </tr>
        <tr>
            <td>Correlation Coefficient</td>
            <td>${r.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Bxy</td>
            <td>${bxy.toFixed(4)}</td>
        </tr>
        <tr>
            <td>Byx</td>
            <td>${byx.toFixed(4)}</td>
        </tr>

        <tr>
        <td>Reg Line X on Y</td>
        <td>X - x̅ =  ${bxy.toFixed(4)} (Y - Ȳ)</td>
        </tr>   

        <tr>
        <td>Reg Line Y on X</td>
        <td> (Y - Ȳ) =  ${byx.toFixed(4)} (X - x̅)</td>
        </tr>   
    </table>


    <hr>

    <center class="red">Jay Borse </center>
    `;
});
