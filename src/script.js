document.addEventListener("DOMContentLoaded", () => {
    const menuButtons = document.querySelectorAll(".menu-btn");
    const contentViews = document.querySelectorAll(".content-view");
    let myChart = null;

    function initChart() {
        const canvas = document.getElementById('monthlyBudgetChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (myChart) { myChart.destroy(); }

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶດສະພາ', 'ມິຖຸນາ', 'ກໍລະກົດ', 'ສິງຫາ', 'ກັນຍາ', 'ຕຸລາ', 'ພະຈິກ', 'ທັນວາ'],
                datasets: [
                    {
                        label: 'ລາຍຮັບ (Income)',
                        data: [15000000, 12000000, 18000000, 25000000, 9000000, 14000000, 0, 0, 0, 0, 0, 0],
                        backgroundColor: 'rgba(52, 211, 153, 0.85)',
                        borderColor: '#10b981',
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: 'ລາຍຈ່າຍ (Expense)',
                        data: [5000000, 8000000, 4500000, 12000000, 6000000, 7000000, 0, 0, 0, 0, 0, 0],
                        backgroundColor: 'rgba(248, 113, 113, 0.85)', 
                        borderColor: '#f43f5e',
                        borderWidth: 1,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1', 
                            font: { family: 'Noto Sans Lao', size: 12 }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(51, 65, 85, 0.3)' }, 
                        ticks: { color: '#94a3b8', font: { family: 'Noto Sans Lao' } }
                    },
                    y: {
                        grid: { color: 'rgba(51, 65, 85, 0.3)' },
                        ticks: {
                            color: '#94a3b8',
                            font: { family: 'Noto Sans Lao' },
                            callback: (value) => value.toLocaleString() + ' ກີບ'
                        }
                    }
                }
            }
        });
    }


    menuButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = button.getAttribute("data-target");


            contentViews.forEach(view => {
                view.classList.add("hidden");
                view.classList.remove("flex");
            });

            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.remove("hidden");
                targetView.classList.add("flex");
            }


            if (targetId === "view-stats") {
                setTimeout(initChart, 50);
            }


            menuButtons.forEach(btn => {
                btn.classList.remove("bg-cyan-700", "text-white", "shadow-lg", "shadow-cyan-600/30");
                btn.classList.add("text-slate-400", "hover:bg-slate-900", "hover:text-white");
            });

            button.classList.add("bg-cyan-700", "text-white", "shadow-lg", "shadow-cyan-600/30");
            button.classList.remove("text-slate-400", "hover:bg-slate-900", "hover:text-white");
        });
    });
});


const venueCards = document.querySelectorAll(".venue-card");
const headerVenueText = document.querySelector("header p.text-slate-400"); 

venueCards.forEach(card => {
    card.addEventListener("click", () => {
        const venueName = card.getAttribute("data-venue");
        const venueLocationDescription = card.querySelector("p").innerText;


        venueCards.forEach(c => {
            c.classList.remove("border-cyan-500", "border-2");
            c.classList.add("border-slate-800", "border");
            c.querySelector(".venue-status").classList.add("hidden");
        });


        card.classList.remove("border-slate-800", "border");
        card.classList.add("border-cyan-500", "border-2");
        card.querySelector(".venue-status").classList.remove("hidden");


        if (headerVenueText) {
            headerVenueText.innerHTML = `<i class="ri-map-pin-2-line text-cyan-400"></i> ສະຖານທີ່: ${venueLocationDescription.replace(' ', '')}`;
        }
    });
});