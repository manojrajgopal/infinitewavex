# xformers_patch.py
import sys
from unittest.mock import MagicMock

# Mock xformers before any other imports
class XFormersMock:
    def __getattr__(self, name):
        return MagicMock()
    
    def __call__(self, *args, **kwargs):
        return MagicMock()

# Mock the entire xformers module
sys.modules['xformers'] = XFormersMock()
sys.modules['xformers.ops'] = XFormersMock()
sys.modules['xformers.ops.fmha'] = XFormersMock()