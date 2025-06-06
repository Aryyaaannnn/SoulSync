function saveEntry() {
    const form = document.getElementById("entryForm");
    const data = new FormData(form);
  
    fetch("save_entry.php", {
      method: "POST",
      body: data
    })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      form.reset();
      fetchEntries();
    });
  }
  
  function fetchEntries() {
    fetch("get_entries.php")
      .then(res => res.text())
      .then(data => {
        document.getElementById("entries").innerHTML = data;
      });
  }
  
  function downloadXML() {
    window.location.href = "export_xml.php";
  }
  
  window.onload = fetchEntries;

  function renderMoodChart() {
    fetch('chart_data.php')
      .then(res => res.json())
      .then(data => {
        const labels = data.map(entry => entry.entry_date);
        const moodValues = data.map(entry => {
          switch (entry.mood) {
            case 'Happy': return 4;
            case 'Calm': return 3;
            case 'Sad': return 2;
            case 'Angry': return 1;
            default: return 0;
          }
        });
  
        const ctx = document.getElementById('moodChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Mood Trend',
              data: moodValues,
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.3,
              fill: true,
              pointRadius: 4,
              pointHoverRadius: 6
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Your Mood Over Time 💫',
                font: {
                  size: 20
                }
              }
            },
            scales: {
              y: {
                min: 0,
                max: 5,
                ticks: {
                  stepSize: 1,
                  callback: function(value) {
                    return ["", "Angry", "Sad", "Calm", "Happy", ""][value];
                  }
                },
                title: {
                  display: true,
                  text: 'Mood'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              }
            }
          }
        });
      });
  }
  

  window.addEventListener('DOMContentLoaded', () => {
    fetchEntries();
    renderMoodChart();
  });
  function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
    
    toastMessage.innerHTML = message;
    toast.classList.add("show");
  

    setTimeout(() => {
      toast.classList.remove("show");
    }, 6000);
  }
  
  function fetchDailyQuoteToast() {
    fetch("https://zenquotes.io/api/today")
      .then(res => res.json())
      .then(data => {
        const quote = data[0];
        const formatted = `<strong>"${quote.q}"</strong><br><em>– ${quote.a}</em>`;
        showToast(formatted);
      })
      .catch(() => {
        showToast("You're amazing just the way you are 💖");
      });
  }
  

  window.addEventListener('DOMContentLoaded', () => {
    fetchDailyQuoteToast();
  });