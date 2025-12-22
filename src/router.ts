import History from "./pages/History.svelte";
import NotFound from "./pages/NotFound.svelte";
import User from "./pages/User.svelte";

export const routes = {
	"/": History,
	"/user": User,
	"*": NotFound
};
