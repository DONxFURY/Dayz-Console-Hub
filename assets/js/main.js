
// Main functionality: filters, modal, join link
document.addEventListener('DOMContentLoaded', ()=>{

  // Tabs
  document.querySelectorAll('.tab').forEach(t=>{
    t.addEventListener('click', ()=>{
      document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      const platform = t.dataset.platform;
      if(platform==='all') showAll();
      else filterPlatform(platform);
    });
  });

  // Filter selects
  document.querySelectorAll('.filter').forEach(s=>{
    s.addEventListener('change', applyFilters);
  });

  function applyFilters(){
    const type = document.getElementById('type-filter').value;
    const map = document.getElementById('map-filter').value;
    const platformSelect = document.getElementById('platform-filter') ? document.getElementById('platform-filter').value : 'all';
    document.querySelectorAll('.card').forEach(card=>{
      const okType = (type==='all') || (card.dataset.type===type);
      const okMap = (map==='all') || (card.dataset.map===map);
      const okPlatform = (platformSelect==='all') || (card.dataset.platform===platformSelect);
      card.style.display = (okType && okMap && okPlatform) ? 'flex' : 'none';
    });
  }

  function showAll(){ document.querySelectorAll('.card').forEach(c=>c.style.display='flex'); }
  function filterPlatform(p){ document.querySelectorAll('.card').forEach(c=> c.dataset.platform===p ? c.style.display='flex' : c.style.display='none'); }

  // Modal
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');
  const modalMeta = document.getElementById('modal-meta');
  const joinBtn = document.getElementById('modal-join');

  document.querySelectorAll('.btn.details').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const card = btn.closest('.card');
      openModalFromCard(card);
    });
  });

  function openModalFromCard(card){
    modalTitle.textContent = card.querySelector('.server-name').textContent;
    modalImg.src = card.dataset.img || 'assets/img/placeholder.png';
    modalDesc.textContent = card.querySelector('.full-desc') ? card.querySelector('.full-desc').textContent : card.querySelector('.desc').textContent;
    // build meta
    modalMeta.innerHTML = `
      <div><strong>Type:</strong> ${card.dataset.type}</div>
      <div><strong>Map:</strong> ${card.dataset.map}</div>
      <div><strong>Wipe:</strong> ${card.dataset.wipe || 'N/A'}</div>
      <div><strong>Slots:</strong> ${card.dataset.slots || 'N/A'}</div>
    `;
    joinBtn.dataset.discord = card.dataset.discord || '';
    modal.classList.add('open');
  }

  document.getElementById('modal-close').addEventListener('click', ()=> modal.classList.remove('open'));
  modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.classList.remove('open'); });

  joinBtn.addEventListener('click', ()=>{
    const url = joinBtn.dataset.discord;
    if(!url) { alert('No Discord link provided for this server.'); return; }
    window.open(url,'_blank');
  });

});
