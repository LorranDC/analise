document.addEventListener('DOMContentLoaded', function () {
    // Ensure uniqueId exists once
    let uniqueId = localStorage.getItem('uniqueVisitorId');
    if (!uniqueId) {
        uniqueId = crypto.randomUUID();
        localStorage.setItem('uniqueVisitorId', uniqueId);
    }

    document.querySelectorAll('.property--interaction').forEach(interaction => {
        const itemId = interaction.dataset.itemId;
        const likeBtn = interaction.querySelector('.like');
        const dislikeBtn = interaction.querySelector('.dislike');
        const shareBtn = interaction.querySelector('.share');

        function logInteraction(action) {
            if (!IS_LOGGED_IN) {
                window.location.href = `${BASE_URL}user/login.php`; // redireciona para login
                return;
            }

            const uniqueId = localStorage.getItem('uniqueVisitorId') || crypto.randomUUID();

            fetch(`${BASE_URL}logInteraction.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    unique_id: uniqueId,
                    item_id: itemId,
                    action: action,
                    timestamp: new Date().toISOString()
                })
            })
                .then(async (response) => {
                    if (!response.ok) throw new Error('Network error');
                    return await response.json();
                })
                .then(data => {
                    if (data.success) {
                        fetch(`${BASE_URL}getPropertyCard.php?id=${itemId}`)
                            .then(res => res.text())
                            .then(html => {
                                const wrapper = interaction.closest('.property-item');
                                const tempDiv = document.createElement('div');
                                tempDiv.innerHTML = html.trim();
                                const newCard = tempDiv.querySelector('.property-item');
                                if (wrapper && newCard) {
                                    wrapper.replaceWith(newCard);
                                }
                            });
                    }
                })
                .catch(err => console.error('Erro ao registrar interação:', err));
        }



        likeBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const wasActive = likeBtn.classList.contains('active');
            toggleIcon(likeBtn);
            resetIcon(dislikeBtn);
            logInteraction(wasActive ? 'remove' : 'like');
        };

        dislikeBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const wasActive = dislikeBtn.classList.contains('active');
            toggleIcon(dislikeBtn);
            resetIcon(likeBtn);
            logInteraction(wasActive ? 'remove' : 'dislike');
        };


        shareBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();

            logInteraction('share');

            // ←–– USE your BASE_URL global here, not window.location.origin
            const link = `${BASE_URL}imovel?cod=${itemId}`;

            navigator.clipboard.writeText(link)
                .then(() => alert('Link copiado para a área de transferência!'))
                .catch(err => console.error('Não foi possível copiar o link:', err));
        };


        function toggleIcon(icon) {
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
            icon.classList.toggle('active');
        }

        function resetIcon(icon) {
            icon.classList.remove('fa-solid', 'active');
            icon.classList.add('fa-regular');
        }
    });
});
