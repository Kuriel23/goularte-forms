interface FormQuestionProps {
	question: string;
	response: string;
}

export default function FormQuestion({
	question,
	response,
}: FormQuestionProps) {
	const replacements = {
		alts: 'Você possui contas alternativas no servidor?',
		reason: 'Motivo do banimento',
		date: 'Informe a data do banimento',
		why: 'Porquê você merece ser desbanido?',
		print: 'Prints ou gravações',
		name: 'Qual seu nome completo?',
		age: 'Qual sua idade?',
		langs: 'Quais linguagens de programação você sabe?',
		portfolio: 'Portfólio',
		about: 'Sinta-se livre para falar sobre você',
		time: 'Quanto tempo diário você passa no Discord?',
		period: 'Qual período você teria mais disponibilidade para moderar?',
		device: 'Você usa o Discord em qual Dispositivo?',
		previouslyBanned: 'Você já foi banido do servidor?',
		experience: 'Você possuí alguma experiência com moderação?',
		characteristics: 'Quais são suas características diferenciais?',
		canServerImprove: 'O que pode ser melhorado no servidor?',
		collaborate: 'Com o que você gostaria de colaborar?',
	};

	let formattedQuestion = question;
	for (const key in replacements) {
		formattedQuestion = formattedQuestion.replace(
			key,
			replacements[key as keyof typeof replacements],
		);
	}

	const isLink =
		response?.includes('http://') || response?.includes('https://');
	const isPrintQuestion = question === 'print';
	const linkMatch = response?.match(/https?:\/\/[^\s]+/);
	const extractedLink = linkMatch ? linkMatch[0] : null;
	const responseWithoutLink = response?.replace(extractedLink as string, '');

	return (
		<div className="mt-3">
			<h2 className="text-2xl max-md:max-w-full">{formattedQuestion}</h2>
			<p className="justify-center px-8 py-7 mt-3 text-lg font-medium rounded-2xl bg-zinc-900 max-md:px-5 max-md:max-w-full">
				{isLink && isPrintQuestion ? (
					<>
						{responseWithoutLink}
						<a
							href={extractedLink || '#'}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:text-blue-700" // Adiciona classes para cor e hover
						>
							{extractedLink}
						</a>
					</>
				) : (
					response
				)}
			</p>
		</div>
	);
}
