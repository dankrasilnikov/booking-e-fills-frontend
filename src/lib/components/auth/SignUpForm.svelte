<script lang="ts">
    import axios from "axios";

    let email = $state('');
    let password = $state('');

    const signUp = async () => {
        const signupData = {
            email,
            password
        };

        console.log(signupData);

        const res = await axios.post('http://localhost:8080/api/auth/register', signupData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(res);
    }
</script>

<div class="loginForm">
    <input bind:value={email} type='text' placeholder="Type your email..."/>
    <input bind:value={password} type='password' placeholder="Type your password..."/>
    <button onclick={signUp}>Sign Up</button>
</div>

<style>
    .loginForm {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 5px;
    }
</style>
