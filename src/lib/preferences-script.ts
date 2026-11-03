// runs before paint so saved choices never flash the defaults
export const preferencesScript = `try{var r=document.documentElement,m=localStorage.getItem("portfolio-motion"),b=localStorage.getItem("portfolio-backdrop");if(m==="reduced")r.dataset.motion="reduced";if(b==="none")r.dataset.backdrop=b}catch(e){}`;
