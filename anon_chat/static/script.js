let currentRoom = 'главная';

const messagesDiv = document.getElementById('messages');
const roomButtons = document.querySelectorAll('.room-btn');
const msgForm = document.getElementById('msgForm');

// Защита от XSS — экранирование текста
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[tag]));
}

function setActiveRoom(room) {
  currentRoom = room;
  roomButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.room === room);
  });
  loadMessages();
}

async function loadMessages() {
  try {
    const res = await fetch(`/messages/${encodeURIComponent(currentRoom)}`);
    const msgs = await res.json();

    messagesDiv.innerHTML = msgs.map(m => {
      const safeName = escapeHTML(m.name);
      const safeText = escapeHTML(m.text);
      const safeTime = escapeHTML(m.time);

      // Превращаем ссылки в кликабельные
      const linkedText = safeText.replace(
        /(https?:\/\/[^\s]+)/g,
        url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
      );

      // Фото (если есть)
      let imgHTML = m.img_url ? `<br><img class="message-img" src="${escapeHTML(m.img_url)}" alt="Фото" />` : '';

      return `<div class="message" data-id="${m.id}">
        <b>${safeName}</b> <span class="time">[${safeTime}]</span>
        <br>${linkedText}
        ${imgHTML}
      </div>`;
    }).join('');
  } catch (err) {
    console.error('Ошибка загрузки сообщений:', err);
  }
}

msgForm.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const text = document.getElementById('text').value;
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];

  if (!text.trim() && !file) return alert("Введите сообщение или выберите фото");

  const formData = new FormData();
  formData.append('name', name);
  formData.append('text', text);
  if (file) formData.append('file', file);

  try {
    await fetch(`/post/${encodeURIComponent(currentRoom)}`, {
      method: 'POST',
      body: formData
    });

    document.getElementById('text').value = '';
    fileInput.value = '';
    document.getElementById('text').placeholder = 'Сообщение...';
    loadMessages();
    const box = document.getElementById('messages');
    box.scrollTo({
    top: box.scrollHeight,
    behavior: 'smooth'
});
  } catch (err) {
    console.error('Ошибка отправки сообщения:', err);
    alert('Ошибка отправки');
  }
  
});

roomButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setActiveRoom(btn.dataset.room);
  });
});

document.getElementById('scrollBtn').addEventListener('click', () => {
  const box = document.getElementById('messages');
  box.scrollTo({
  top: box.scrollHeight,
  behavior: 'smooth'
});
});

setActiveRoom(currentRoom);
setInterval(() => {
  // Проверяем, есть ли выделенный текст на странице
  const selection = window.getSelection();
  const isTextSelected = selection && selection.toString().length > 0;

  if (!isTextSelected) {
      loadMessages();
  }
}, 3000);