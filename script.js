document.addEventListener('DOMContentLoaded', function() {
    // Элементы для модального окна
    const buyButton = document.getElementById('buyBtn');
    const paymentModal = document.getElementById('paymentModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Элементы для слайдера
    const slider = document.getElementById('currencyRange');
    const currencyAmount = document.querySelector('.currency-amount');
    const sliderProgress = document.querySelector('.slider-progress');
    const exchangeAmount = document.querySelector('.exchange-amount');
    const paymentAmountInModal = document.getElementById('paymentAmount');
    const currencyAmountInModal = document.getElementById('currencyAmount');
    
    // Элементы для копирования адреса сервера
    const copyButton = document.querySelector('.copy-btn');
    const serverAddress = document.querySelector('.server-address span');
    
    // Обработка открытия модального окна
    if (buyButton) {
        buyButton.addEventListener('click', function() {
            paymentModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
            
            // Устанавливаем значения внутри модального окна
            if (currencyAmountInModal && paymentAmountInModal) {
                currencyAmountInModal.textContent = slider.value + ' рилликов';
                paymentAmountInModal.textContent = calculatePrice(slider.value) + '₽';
            }
        });
    }
    
    // Обработка закрытия модального окна
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            paymentModal.classList.remove('active');
            document.body.style.overflow = ''; // Разблокируем прокрутку страницы
        });
    }
    
    // Закрытие по клику вне модального окна
    paymentModal.addEventListener('click', function(e) {
        if (e.target === paymentModal) {
            paymentModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Обработка изменения слайдера
    if (slider && currencyAmount && sliderProgress) {
        slider.addEventListener('input', function() {
            const value = this.value;
            const max = this.max;
            const percentage = (value / max) * 100;
            
            // Обновляем отображение количества рилликов
            currencyAmount.textContent = value;
            
            // Обновляем прогресс слайдера
            sliderProgress.style.width = percentage + '%';
            
            // Обновляем отображаемую цену
            const price = calculatePrice(value);
            exchangeAmount.textContent = price + '₽';
            
            // Обновляем фон слайдера
            this.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-light) ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;
        });
    }
    
    // Функция расчета цены (простая линейная зависимость для примера)
    function calculatePrice(amount) {
        // Коэффициент конверсии: 1 риллик = 0.083 рубля (примерно)
        const conversionRate = 0.083;
        return Math.round(amount * conversionRate);
    }
    
    // Копирование адреса сервера
    if (copyButton && serverAddress) {
        copyButton.addEventListener('click', function() {
            const tempInput = document.createElement('input');
            tempInput.value = serverAddress.textContent.trim();
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // Визуальное подтверждение копирования
            const originalIcon = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyButton.innerHTML = originalIcon;
            }, 2000);
        });
    }
    
    // Обработка отправки формы оплаты
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить валидацию формы
            const cardNumber = document.getElementById('cardNumber').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            const cardHolder = document.getElementById('cardHolder').value;
            
            if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            // Симуляция отправки формы
            const submitButton = paymentForm.querySelector('.payment-btn');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Обработка...';
            submitButton.disabled = true;
            
            // Имитация задержки обработки
            setTimeout(() => {
                alert('Оплата успешно обработана! Риллики зачислены на ваш счет.');
                paymentModal.classList.remove('active');
                document.body.style.overflow = '';
                paymentForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Форматирование ввода номера карты
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            this.value = formattedValue;
        });
    }
    
    // Форматирование ввода срока действия карты
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                formattedValue = value.substr(0, 2);
                if (value.length > 2) {
                    formattedValue += '/' + value.substr(2, 2);
                }
            }
            
            this.value = formattedValue;
        });
    }
    
    // Переключение между вкладками привилегий
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Здесь можно добавить логику загрузки соответствующего контента
            });
        });
    }
}); 