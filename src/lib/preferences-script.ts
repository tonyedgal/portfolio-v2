// runs before paint so saved choices never flash the defaults;
// a first visit also shows the settings bar from the first paint, before the page's JavaScript loads
export const preferencesScript = `try{var r=document.documentElement,s=function(k){return localStorage.getItem("portfolio-"+k)},m=s("motion"),b=s("backdrop"),n=s("nav"),a=s("sound");if(m==="reduced")r.dataset.motion="reduced";if(b==="none")r.dataset.backdrop=b;if(n==="classic")r.dataset.nav=n;if(a==="off")r.dataset.sound=a;if(s("settings-seen")===null)r.dataset.reveal=""}catch(e){}`;
