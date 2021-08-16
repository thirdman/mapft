<template>
  <div class="pageContainer">
    <Header />
    
    <section class="row ma-0">
        <div class="col col-6">
          <h2>SVG Minting</h2>
          
          
        </div>
        <div class="col">
          <h4>Notes:</h4>
            <ul style="margin: 0; padding: 0;">
              <li class="small">Beta functionality: use at your own risk</li>
              <li class="xsmall">needs to have somthing like: <br /><code>xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink"</code> or an xml declaration?</li>
              <li class="small">Must be less than 15000 bytes</li>
              <li class="small">Minting Fee: 0.1</li>
            </ul>
        </div>
      
    </section>
    <Footer />
  </div>
</template>

<script>
export default {
  head: {
    title: 'About',
    // meta: [
    //   { hid: 'description', name: 'description', content: 'View a cool nft' },
    // ],
  }
}
</script>

<style></style>
