<template>
  <div>
    <header>
      <h1>My Nuxt App</h1>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <p>&copy; 2024 My Nuxt App</p>
    </footer>
  </div>
</template>

<style scoped>
header {
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: white;
  margin: 0 0.5rem;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

main {
  padding: 2rem;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
