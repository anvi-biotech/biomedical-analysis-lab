document.getElementById('dnaForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Isse page submit hone par refresh nahi hoga

    const dnaInput = document.getElementById('dnaInput').value;
    const scanBtn = document.getElementById('scanBtn');

    // Button ka text change karenge taaki professional lage
    scanBtn.innerText = "ANALYZING SEQUENCE... 🧬";
    scanBtn.disabled = true;

    try {
        // Piche se Python Flask server ko data bhej rahe hain
        const response = await fetch('http://127.0.0.1:5000/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dna: dnaInput })
        });

        const data = await response.json();

        // Dashboard ke andar values update karna
        document.getElementById('resDNA').innerText = data.cleaned_dna;
        document.getElementById('resLength').innerText = data.length;
        
        // True/False ko sundar ✅ aur ❌ emojis mein badalna
        document.getElementById('resStart').innerText = data.starts_with_atg ? "✅ True (Valid Start)" : "❌ False (Invalid)";
        document.getElementById('resEnd').innerText = data.ends_with_taa ? "✅ True (Valid End)" : "❌ False (Invalid)";
        document.getElementById('resValid').innerText = data.is_alpha ? "✅ True (No Numbers)" : "❌ False (Contains Numbers/Symbols)";
        
        document.getElementById('resSignature').innerText = data.signature;

    } catch (error) {
        console.error("Error connecting to backend:", error);
        alert("Backend server se connection nahi ho paaya! Pehle Flask server chalao.");
    } finally {
        // Button ko wapas normal kar do
        scanBtn.innerText = "RUN ANALYSIS 🚀";
        scanBtn.disabled = false;
    }
});