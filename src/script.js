document.addEventListener("DOMContentLoaded", () => {
    const menuButtons = document.querySelectorAll(".menu-btn");
    const contentViews = document.querySelectorAll(".content-view");
    let myChart = null;

    // 📊 ຟັງຊັນແຕ້ມກຣາຟໃຫ້ເຂົ້າກັບ Dark Mode ຂອງເວັບ
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
                        label: '📈 ລາຍຮັບ (Income)',
                        data: [15000000, 12000000, 18000000, 25000000, 9000000, 14000000, 0, 0, 0, 0, 0, 0],
                        backgroundColor: 'rgba(52, 211, 153, 0.85)', // ສີຂຽວ Emerald
                        borderColor: '#10b981',
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: '📉 ລາຍຈ່າຍ (Expense)',
                        data: [5000000, 8000000, 4500000, 12000000, 6000000, 7000000, 0, 0, 0, 0, 0, 0],
                        backgroundColor: 'rgba(248, 113, 113, 0.85)', // ສີແດງ Rose
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
                            color: '#cbd5e1', // ສີ Slate-300
                            font: { family: 'Noto Sans Lao', size: 12 }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(51, 65, 85, 0.3)' }, // ເສັ້ນ Grid ບາງໆ ໂທນ Dark
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

    // 🔄 Logic ການສະຫຼັບໜ້າ View (ຮັກສາ Syntax ເດີມຂອງເຈົ້າໄວ້)
    menuButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = button.getAttribute("data-target");

            // 1. ຊ້ອນທຸກໜ້າວີວ
            contentViews.forEach(view => {
                view.classList.add("hidden");
                view.classList.remove("flex");
            });

            // 2. ເປີດສະເພາະໜ້າທີ່ເຮົາຄລິກ
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.remove("hidden");
                targetView.classList.add("flex");
            }

            // 🌟 ຖ້າກົດປຸ່ມສະຖິຕິ (view-stats) ໃຫ້ເລີ່ມແຕ້ມກຣາຟທັນທີ
            if (targetId === "view-stats") {
                setTimeout(initChart, 50);
            }

            // 3. ປ່ຽນສະຖານະສີຂອງປຸ່ມ (Active Menu Style)
            menuButtons.forEach(btn => {
                btn.classList.remove("bg-cyan-700", "text-white", "shadow-lg", "shadow-cyan-600/30");
                btn.classList.add("text-slate-400", "hover:bg-slate-900", "hover:text-white");
            });

            button.classList.add("bg-cyan-700", "text-white", "shadow-lg", "shadow-cyan-600/30");
            button.classList.remove("text-slate-400", "hover:bg-slate-900", "hover:text-white");
        });
    });
});