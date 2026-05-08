// 認証関連JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ログインフォーム
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // 登録フォーム
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // カード番号フォーマット
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', formatCardNumber);
    }

    // 有効期限フォーマット
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', formatExpiry);
    }

    // CVVフォーマット
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', formatCVV);
    }

    // パスワード確認
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (passwordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value !== passwordInput.value) {
                this.setCustomValidity('パスワードが一致しません');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});

// ログイン処理
async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');

    // バリデーション
    if (!email || !password) {
        utils.showNotification('メールアドレスとパスワードを入力してください', 'error');
        return;
    }

    // ローディング表示
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'ログイン中...';
    submitBtn.disabled = true;

    try {
        // APIリクエスト（実装例）
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, remember })
        });

        if (response.ok) {
            const data = await response.json();
            
            // トークンを保存
            utils.storage.set('authToken', data.token);
            utils.storage.set('user', data.user);

            // 会員ステータスを確認
            if (data.user.subscriptionStatus === 'active') {
                utils.showNotification('ログインしました', 'success');
                setTimeout(() => {
                    window.location.href = 'marketplace.html';
                }, 1000);
            } else {
                utils.showNotification('有効な会員登録が必要です', 'error');
                setTimeout(() => {
                    window.location.href = 'subscription.html';
                }, 1500);
            }
        } else {
            const error = await response.json();
            utils.showNotification(error.message || 'ログインに失敗しました', 'error');
        }
    } catch (error) {
        console.error('ログインエラー:', error);
        
        // デモ用：ローカルでの動作確認
        utils.storage.set('authToken', 'demo-token-' + Date.now());
        utils.storage.set('user', {
            email: email,
            name: '山田太郎',
            subscriptionStatus: 'active',
            plan: 'premium'
        });
        
        utils.showNotification('ログインしました（デモモード）', 'success');
        setTimeout(() => {
            window.location.href = 'marketplace.html';
        }, 1000);
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// 登録処理
async function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        plan: formData.get('plan'),
        lastName: formData.get('lastName'),
        firstName: formData.get('firstName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        cardNumber: formData.get('cardNumber'),
        expiry: formData.get('expiry'),
        cvv: formData.get('cvv'),
        terms: formData.get('terms')
    };

    // バリデーション
    if (!data.terms) {
        utils.showNotification('利用規約に同意してください', 'error');
        return;
    }

    if (data.password !== data.confirmPassword) {
        utils.showNotification('パスワードが一致しません', 'error');
        return;
    }

    if (data.password.length < 8) {
        utils.showNotification('パスワードは8文字以上で入力してください', 'error');
        return;
    }

    // ローディング表示
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '登録中...';
    submitBtn.disabled = true;

    try {
        // APIリクエスト（実装例）
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            
            // トークンを保存
            utils.storage.set('authToken', result.token);
            utils.storage.set('user', result.user);

            utils.showNotification('会員登録が完了しました', 'success');
            
            // ウェルカムメール送信通知
            sendWelcomeEmail(data.email);
            
            setTimeout(() => {
                window.location.href = 'marketplace.html';
            }, 1500);
        } else {
            const error = await response.json();
            utils.showNotification(error.message || '登録に失敗しました', 'error');
        }
    } catch (error) {
        console.error('登録エラー:', error);
        
        // デモ用：ローカルでの動作確認
        utils.storage.set('authToken', 'demo-token-' + Date.now());
        utils.storage.set('user', {
            email: data.email,
            name: `${data.lastName} ${data.firstName}`,
            subscriptionStatus: 'active',
            plan: data.plan
        });
        
        utils.showNotification('会員登録が完了しました（デモモード）', 'success');
        setTimeout(() => {
            window.location.href = 'marketplace.html';
        }, 1500);
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// カード番号フォーマット
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
}

// 有効期限フォーマット
function formatExpiry(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
}

// CVVフォーマット
function formatCVV(e) {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
}

// ウェルカムメール送信（デモ）
function sendWelcomeEmail(email) {
    console.log(`ウェルカムメールを送信: ${email}`);
    // 実際の実装では、バックエンドAPIを呼び出してメール送信
}

// 認証チェック
function checkAuth() {
    const token = utils.storage.get('authToken');
    const user = utils.storage.get('user');
    
    if (!token || !user) {
        return false;
    }
    
    // 会員ステータスチェック
    if (user.subscriptionStatus !== 'active') {
        return false;
    }
    
    return true;
}

// ログアウト
function logout() {
    utils.storage.remove('authToken');
    utils.storage.remove('user');
    utils.showNotification('ログアウトしました', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// グローバルに公開
window.authUtils = {
    checkAuth,
    logout
};
