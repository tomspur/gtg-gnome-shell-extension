const Gio = imports.gi.Gio;

// Interface
const GTGIFace = '<node> \
<interface name="org.gnome.GTG"> \
<method name="GetActiveTasks"> \
    <arg type="as" direction="out" /> \
    <arg type="aa{sv}" direction="out" /> \
</method> \
<method name="OpenTaskEditor"> \
    <arg type="s" direction="out" /> \
</method> \
<method name="ShowTaskBrowser"> \
</method> \
<signal name="TaskAdded"> \
    <arg type="s" direction="out" /> \
</signal> \
<signal name="TaskModified"> \
    <arg type="s" direction="out" /> \
</signal> \
<signal name="TaskDeleted"> \
    <arg type="s" direction="out" /> \
</signal> \
</interface> \
</node>';


// Proxy
const GTGProxy = Gio.DBusProxy.makeProxyWrapper(GTGIFace);

//
// Functions
//

// Open the task editor with the given task
function openTaskEditor(id) { GTGProxy.OpenTaskEditorRemote(id); }

// Call the "GetActiveTasks" method in DBus interface
function getActiveTasks(tags, callback)
{
    function handler(results, error)
    {
        if (error != null)
            global.logError("Error retrieving GTG tasks: "+error);
        else
            callback(results);
    }
    GTGProxy.GetActiveTasksRemote(tags, handler);
}
