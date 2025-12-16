<script>
export default {
  name: 'Register',
}
</script>

<template>
  <div>
    <div class="my-5 text-center offset-2 col-8">
      <img class="img-fluid" src="/src/assets/welcome.svg" alt="" />
    </div>
    <div class="text-center">
      <h2>Jetzt registrieren</h2>
      <p>oder <a class="text-vue2">melden Sie sich mit Ihrem Konto an</a></p>
    </div>
    <form>
      <div class="form-row">
        <!-- EMAIL -->
        <div class="mb-3 col-8 offset-2">
          <label class="form-label" for="email"><strong>E-Mail-Adresse</strong></label>
          <input type="email" class="form-control" id="email" />
        </div>
        <!-- PASSWORD -->
        <div class="mb-3 col-8 offset-2">
          <label class="form-label" for="password"><strong>Passwort</strong></label>
          <input type="password" class="form-control" id="password" />
        </div>
        <!-- CONFORM PASSWORD -->
        <div class="mb-3 col-8 offset-2">
          <label class="form-label" for="confirmPassword"
            ><strong>Passwort wiederholen</strong></label
          >
          <input type="password" class="form-control" id="confirmPassword" />
        </div>
        <!-- BUTTON -->
        <div class="mb-3 col-8 offset-2">
          <div class="d-grid">
            <button class="btn bg-vue">Registrieren</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
