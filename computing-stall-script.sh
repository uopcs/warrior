main(){

	clear
	loading

	drawTitle

	signUp

	# echo "> What do you want to do?"
	# echo "[1] Get sent some more info by email."
	# echo "[2] Loop a word (excellent fun A++)."
	# echo ""

	# valid=0

	# while [ $valid -eq 0 ];	do

	# 	read input

	# 	if [ ${#input} -lt 1 ]; then
	# 		valid=0
	# 		echo "# Enter a number!"
	# 	elif [ "$input" -eq "1" ]; then
	# 		valid=1
	# 		signUp
	# 	elif [ "$input" -eq "2" ]; then
	# 		valid=1
	# 		echo "> Which word do you want to loop?"
	# 		echo ""
	# 		read word
	# 		loopWord $word
	# 	elif [ "$input" -eq "13" ]; then
	# 		main
	# 	else
	# 		valid=0
	# 	fi

	# done

}

loopWord(){

	word="$1 $1 $1 $1 $1 $1 $1 $1 $1 $1 $1 $1 $1"
	count=0
	while [ $count -ne 100 ]; do
		echo "$word"
		sleep 0.025
		(( count++ ))
	done

	main

}

signUp(){

	valid=0

	while [ $valid -eq 0 ];	do
		echo "> So, what's your name?"
		read name

		if [ ${#name} -lt 1 ]; then
			echo "# You didn't enter anything!"
			valid=0
		else
			valid=1
		fi

	done

	valid=0

	while [ $valid -eq 0 ];	do

		echo "> What's your email, $name?"
		read email
		
		if [ ${#email} -lt 1 ]; then
			echo "# You didn't enter anything!"
			valid=0
		elif [[ "$email" != *"@"* ]]; then
			echo "# '$email'? I don't think that's a real email?"
			valid=0
		else
			valid=1
		fi

	done

	echo "> Alright, $name. We'll send you a mail with some info to '$email'!"
	echo "$name -- $email" >> computing-stall-output.txt 
	sleep 2
	echo "> Go back? [Press Enter]"
	read a
	main

}

loading(){

	echo "TODO: Write funny loading shit."
	clear

}

drawTitle(){

	echo "                                                               "; sleep 0.05
	echo "   THE                                                         "; sleep 0.05
	echo "   _____ ____  __  __ _____  _    _ _______ _____ _   _  _____ "; sleep 0.05
	echo "  / ____/ __ \|  \/  |  __ \| |  | |__   __|_   _| \ | |/ ____|"; sleep 0.05
	echo " | |   | |  | | \  / | |__) | |  | |  | |    | | |  \| | |  __ "; sleep 0.05
	echo " | |   | |  | | |\/| |  ___/| |  | |  | |    | | |     | | |_ |"; sleep 0.05
	echo " | |___| |__| | |  | | |    | |__| |  | |   _| |_| |\  | |__| |"; sleep 0.05
	echo "  \_____\____/|_|  |_|_|     \____/   |_|  |_____|_| \_|\_____|"; sleep 0.05                                                             
	echo "                                                               "; sleep 0.05
	echo "                                                        SOCIETY"; sleep 0.05
	echo "                                                               "; sleep 0.05        
	echo "  Wanna sign-up? :¬D                                           "; sleep 0.05        
	echo "                                                               "; sleep 0.05        

}

main

