import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.feature_selection import SelectKBest, chi2

# Load and preprocess the data
data = pd.read_csv("diabetes_data.csv")
data.columns = data.columns.str.lower().str.replace(' ', '_')

# Feature selection and transformation
xfeatures = data.drop(columns=['label'], axis=1)
ylabels = data['label']  # corrected yfeatures -> ylabels

# Feature selection using chi-squared test
skb = SelectKBest(score_func=chi2, k=16)
xfeatures_best = skb.fit_transform(xfeatures, ylabels)

# Get the names of the selected features
selected_columns = xfeatures.columns[skb.get_support()]

# Print selected columns for verification
print("Selected features:", selected_columns)

# Train-test split
x_train, x_test, y_train, y_test = train_test_split(xfeatures_best, ylabels, test_size=0.25, random_state=42)

# Train Decision Tree Classifier
clf = DecisionTreeClassifier()
model_tree = clf.fit(x_train, y_train)

# Save the model
joblib.dump(model_tree, "decision_tree_model.pkl")
print("Model saved successfully!")
