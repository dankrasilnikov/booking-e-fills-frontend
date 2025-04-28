<script lang="ts">
    let email = $state('');
    let password = $state('');

    const signUp = () => {

    }
</script>

<div class="loginForm">
    <input bind:value={email} type='text' placeholder="Type your email..."/>
    <input bind:value={password} type='password' placeholder="Type your password..."/>
    <button>Sign Up</button>
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
