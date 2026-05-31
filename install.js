
let deferredPrompt;
const installBanner = document.createElement('div');
installBanner.id = 'installBanner';
installBanner.className = 'install-banner hidden';
document.body && document.body.appendChild(installBanner);

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
    showInstallButton();
});

function showInstallButton() {
    const pageBtn = document.getElementById('installPageBtn');
    if (pageBtn) {
        pageBtn.classList.remove('hidden');
        pageBtn.addEventListener('click', installApp);
    }
}

async function installApp() {
    const banner = document.getElementById('installBanner');
    if (!deferredPrompt) return;
    if (banner) banner.classList.add('hidden');
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
        console.log('User accepted the install prompt');
    } else {
        console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
    const pageBtn = document.getElementById('installPageBtn');
    if (pageBtn) pageBtn.classList.add('hidden');
}

function showInstallBanner() {
    const banner = document.getElementById('installBanner');
    if (!banner || !deferredPrompt) return;

    banner.innerHTML = `
        <div class="install-banner__inner">
            <div class="install-banner__text">
                <strong>TASHINI HOTEL</strong>
                <p>Install the app for faster access and a polished phone experience.</p>
            </div>
            <div class="install-banner__actions">
                <button id="installNowBtn" class="btn install-now">Install</button>
                <button id="installCloseBtn" class="install-close" aria-label="Close install banner">×</button>
            </div>
        </div>
    `;
    banner.classList.remove('hidden');

    document.getElementById('installNowBtn').addEventListener('click', async () => {
        banner.classList.add('hidden');
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        deferredPrompt = null;
        if (choice.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
    });

    document.getElementById('installCloseBtn').addEventListener('click', () => {
        banner.classList.add('hidden');
    });
}

window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js').catch((err) => {
            console.error('Service Worker registration failed:', err);
        });
    }
});
