pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
        APP_NAME     = 'react-cicd-app'
        DEPLOY_DIR   = '/var/www/html/react-cicd-app'   // ← change to your server path
    }

    tools {
        nodejs 'NodeJS-18'   // ← must match the name in Jenkins → Global Tool Config
    }

    stages {

        stage('📥 Checkout') {
            steps {
                echo "Checking out branch: ${env.BRANCH_NAME}"
                checkout scm
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'          // clean install from package-lock.json
            }
        }

        stage('🧪 Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('🏗️ Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('🚀 Deploy') {
            when {
                branch 'main'        // only deploy from main branch
            }
            steps {
                echo "Deploying to ${DEPLOY_DIR}..."
                sh """
                    rm -rf ${DEPLOY_DIR}
                    mkdir -p ${DEPLOY_DIR}
                    cp -r build/* ${DEPLOY_DIR}/
                """
                echo "✅ Deployment complete!"
            }
        }

    }

    post {
        success {
            echo "✅ Pipeline succeeded for ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
        failure {
            echo "❌ Pipeline FAILED for ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
        always {
            cleanWs()   // clean workspace after build
        }
    }
}
