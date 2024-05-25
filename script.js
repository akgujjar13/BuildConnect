const search = document.querySelector('.input-group input');
const tableRows = document.querySelectorAll('tbody tr');

search.addEventListener('input', searchTable);

function searchTable() {
  const searchData = search.value.toLowerCase();

  tableRows.forEach((row, i) => {
    const tableData = row.textContent.toLowerCase();

    // Toggle the 'hide' class based on search data
    row.classList.toggle('hide', tableData.indexOf(searchData) < 0);

    // Set CSS variable for delay (optional)
    row.style.setProperty('--delay', i / 25 + 's');
  });

  // Alternate row background color for visible rows
  document.querySelectorAll('tbody tr:not(.hide)').forEach((visibleRow, i) => {
    visibleRow.style.backgroundColor = (i % 2 === 0) ? 'transparent' : '#0000000b';
  });
}


document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var rating = document.querySelector('input[name="rating"]:checked').value;
    var comment = document.getElementById("comment").value;


    // Here you can handle the submission, for now just logging the values
   console.log("Rating: ", rating);
    console.log("Comment: ", comment);
    // You can send this data to the server using AJAX or other methods
    // For simplicity, I'm just logging it here
});
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('laborTable');
    const overallEfficiencyHeader = document.getElementById('overallEfficiencyHeader');
    let isAscending = true;

    overallEfficiencyHeader.addEventListener('click', () => {
        isAscending = !isAscending;
        sortTableByOverallEfficiency(table, isAscending);
        updateSortIndicator(overallEfficiencyHeader, isAscending);
    });
});

function sortTableByOverallEfficiency(table, isAscending) {
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);

    const sortedRows = rows.sort((a, b) => {
        const aEfficiency = parseFloat(a.cells[8].innerText.replace('%', ''));
        const bEfficiency = parseFloat(b.cells[8].innerText.replace('%', ''));
        return isAscending ? aEfficiency - bEfficiency : bEfficiency - aEfficiency;
    });

    sortedRows.forEach(row => tbody.appendChild(row));
}

function updateSortIndicator(header, isAscending) {
    const headers = header.parentElement.children;
    for (let th of headers) {
        th.classList.remove('sort-asc', 'sort-desc');
    }
    header.classList.add(isAscending ? 'sort-asc' : 'sort-desc');
}

(function () {
    var Progress = function (element) {
        this.context = element.getContext("2d");
        this.refElement = element.parentNode;
        this.loaded = 0;
        this.start = 4.72;
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
        this.total = parseInt(this.refElement.dataset.percent, 10);
        this.timer = null;

        this.diff = 0;

        this.run = this.run.bind(this);
    };

    Progress.prototype = {
        init: function () {
            this.timer = setInterval(this.run, 25);
        },
        run: function () {
            this.diff = ((this.loaded / 100) * Math.PI * 2 * 10).toFixed(2);
            this.context.clearRect(0, 0, this.width, this.height);
            this.context.lineWidth = 4;
            this.context.fillStyle = "#000";
            this.context.strokeStyle = "#5318f4";
            this.context.textAlign = "center";

            this.context.fillText(
                this.loaded + "%",
                this.width * 0.5,
                this.height * 0.5 + 2,
                this.width
            );
            this.context.beginPath();
            this.context.arc(
                35,
                35,
                30,
                this.start,
                this.diff / 10 + this.start,
                false
            );
            this.context.stroke();

            if (this.loaded >= this.total) {
                clearInterval(this.timer);
            }

            this.loaded++;
        }
    };

    var CircularSkillBar = function (elements) {
        this.bars = document.querySelectorAll(elements);
        this.progressBars = [];
        if (this.bars.length > 0) {
            this.init();
        }
    };

    CircularSkillBar.prototype = {
        init: function () {
            var self = this;
            self.bars.forEach(function (bar) {
                var canvas = bar.querySelector("canvas");
                var prog = new Progress(canvas);
                self.progressBars.push(prog);
            });
            self.startProgressBars();
        },
        startProgressBars: function () {
            this.progressBars.forEach(function (progress) {
                progress.init();
            });
        }
    };

    var button = document.getElementById("softs");

    button.addEventListener(
        "click",
        function () {
            new CircularSkillBar("#sbars .sbar");
        },
        false
    );

    document.addEventListener("DOMContentLoaded", function () {
        new CircularSkillBar("#hbars .hbar");
    });
})();


  