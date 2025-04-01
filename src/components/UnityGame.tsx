import React, { useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UnityGame: React.FC = () => {
	const [loadingPercentage, setLoadingPercentage] = useState(0);

	const { unityProvider, loadingProgression, isLoaded, addEventListener, removeEventListener } =
		useUnityContext({
			loaderUrl: '/game/flappy-build.loader.js',
			dataUrl: '/game/flappy-build.data.br',
			frameworkUrl: '/game/flappy-build.framework.js.br',
			codeUrl: '/game/flappy-build.wasm.br'
		});

	useEffect(() => {
		setLoadingPercentage(Math.round(loadingProgression * 100));
	}, [loadingProgression]);

	useEffect(() => {
		if (isLoaded) {
			const handleScoreChange = (...parameters: any[]) => {
				const score = parameters[0];
				console.log('Score changed:', score);
			};

			addEventListener('ScoreChanged', handleScoreChange);
			return () => {
				removeEventListener('ScoreChanged', handleScoreChange);
			};
		}
	}, [isLoaded, addEventListener, removeEventListener]);

	return (
		<div className="unity-wrapper relative">
			{!isLoaded && (
				<div className="loading-overlay bg-opacity-80 absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900 text-white">
					<div className="mb-4 h-4 w-64 overflow-hidden rounded-full bg-gray-700">
						<div
							className="h-full bg-green-500 transition-all duration-300"
							style={{ width: `${loadingPercentage}%` }}
						></div>
					</div>
					<p>Loading: {loadingPercentage}%</p>
				</div>
			)}

			<Unity
				className="h-[600px] w-full"
				unityProvider={unityProvider}
				style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
			/>
		</div>
	);
};

export default UnityGame;
