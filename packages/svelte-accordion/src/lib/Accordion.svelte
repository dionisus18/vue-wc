<!--Add this line to your web component-->
<svelte:options tag="wc-accordion" />

<script>
  let show = false;
  const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g transform="translate(-224.5 -1834)"><rect width="5.519" height="22" rx="2.759" transform="translate(232.741 1834)" fill="#6cf"/><rect width="5.519" height="22" rx="2.759" transform="translate(246.5 1842.241) rotate(90)" fill="#6cf"/></g></svg>`;
  const minusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="5.519" viewBox="0 0 22 5.519"><g transform="translate(-224.5 -1842.241)"><rect width="5.519" height="22" rx="2.759" transform="translate(246.5 1842.241) rotate(90)" fill="#6cf"/></g></svg>`;
</script>

<details>
  <summary on:click={() => (show = !show)}>
    How can we do this?
    {#if show}
      {@html minusIcon}
    {:else}
      {@html plusIcon}
    {/if}
  </summary>
  {#if show}
    <div class="details-info">
      <slot>
        this fallback content will be rendered when no content is provided, like
        in the first example
      </slot>
    </div>
  {/if}
</details>

<style>
  details {
    --collapse-bg: #ffffff;
    --collapse-color: #202b46;
    --collapse-line-color: #202b46;
    background: var(--collapse-bg);
    color: var(--collapse-color);
    margin-bottom: 2rem;
    border: 2px solid var(--collapse-line-color);
  }

  summary {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    cursor: pointer;
    list-style-type: none;
  }

  details:focus,
  details[open] {
    --collapse-border-color: #c341ab;
    border-color: var(--collapse-border-color);
  }

  details:is([open]) summary:focus {
    --collapse-line-color: #202b46;
    border-bottom: 2px solid;
    border-color: var(--collapse-line-color);
  }

  summary,
  .details-info {
    padding: 1rem;
  }
</style>
