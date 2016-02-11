# International Color code quiz
# Programming Problem Solution

The architecture of the solution is presented as a Node.js application, running on the command-line.  This seemed like the simplest solution given the fact that no interface requirement was specified in the application requirements.

The design consists of a c/c++ like layout with a main, a small number of functions, a very simple “class” for the Robot’s state and globals for Robot, World and list of Lost Robots.

List of assumptions:

	Robots defined outside of the world map generate errors instead of leaving a lost scent.

	The application is best presented as a command-line oriented program.

	Input is interactive as opposed to piped from STDIN or via a source file.

	Errors generate a message and fail to update game state as opposed to terminating 
runtime.

	The sample input and output indicate that there can sometimes be no space between the x and y coordinate values.  This is illogical, because it is possible to have values that are indeterminate if the maximum values for coords is 50.  examples:  245 N - is this parsed as 24 5 or as 2 45?

I took about 4 hours to do the demo that is included in this response - I think it’s fairly operational.  I’d estimate another 4 to 8 hours for refactoring and writing full test coverage.
