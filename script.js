(() => {
  const menuToggle = document.querySelector('#menuToggle');
  const mainNav = document.querySelector('#mainNav');
  const overlay = document.querySelector('#overlay');
  const orderModal = document.querySelector('#orderModal');
  const orderForm = document.querySelector('#orderForm');
  const orderResult = document.querySelector('#orderResult');
  const orderUrl = 'https://t.me/gosmuv';

  function openOrder() {
    orderModal.hidden = false;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    orderResult.hidden = true;
    orderForm.hidden = false;
    orderResult.replaceChildren();
    const firstInput = orderForm.querySelector('input');
    if (firstInput) firstInput.focus({ preventScroll: true });
  }

  function closeOrder() {
    orderModal.hidden = true;
    overlay.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('#orderOpen, a[href="#order"], .hero-actions a[href="#product"]').forEach((element) => {
    if (element.id === 'orderOpen' || element.getAttribute('href') === '#order') {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        openOrder();
      });
    }
  });

  document.querySelector('#orderClose').addEventListener('click', closeOrder);
  overlay.addEventListener('click', closeOrder);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !orderModal.hidden) closeOrder();
  });

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(orderForm);
    const safe = (value) => String(value || '').replace(/[<>]/g, '').trim();
    const delivery = data.get('delivery') === 'courier' ? 'СДЭК — курьером' : 'СДЭК — в пункт выдачи';
    const message = [
      'здравствуйте! хочу заказать подвеску «на повторе» от мелора.',
      '',
      'изделие: подвеска «на повторе»',
      'стоимость: 8 900 ₽',
      `имя: ${safe(data.get('name'))}`,
      `контакт: ${safe(data.get('contact'))}`,
      `доставка: ${delivery}`,
      safe(data.get('comment')) ? `комментарий: ${safe(data.get('comment'))}` : '',
      '',
      'пожалуйста, подтвердите наличие, сроки, стоимость доставки и способы оплаты.'
    ].filter(Boolean).join('\n');
    const telegramUrl = `${orderUrl}?text=${encodeURIComponent(message)}`;
    orderResult.replaceChildren();
    const title = document.createElement('strong');
    title.textContent = 'заявка подготовлена';
    const note = document.createElement('p');
    note.textContent = 'открой Telegram, проверь детали заказа и отправь сообщение, чтобы мы могли связаться с тобой.';
    const link = document.createElement('a');
    link.className = 'button button-dark full-width';
    link.href = telegramUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'открыть telegram';
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrow.setAttribute('viewBox', '0 0 24 24');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.innerHTML = '<path d="M5 12h13M12 5l7 7-7 7" />';
    link.appendChild(arrow);
    orderResult.append(title, note, link);
    orderResult.hidden = false;
    orderForm.hidden = true;
  });

  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Открыть меню');
    });
  });
})();
