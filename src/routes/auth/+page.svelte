<script lang="ts">
    import LoginForm from "$lib/components/auth/LoginForm.svelte";
    import SignUpForm from "$lib/components/auth/SignUpForm.svelte";
</script>

<div class="auth-wrapper">
    <LoginForm/>
    <SignUpForm/>
</div>

<style>
.auth-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 30px;
}
</style>
